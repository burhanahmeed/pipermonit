import Firestore from "./firebase";
const db = Firestore.firestore();

import { sendMessage } from "./telegram";
import axios from "axios";

const fetchAll = () => {
  db.collection('assets').where('nextRunAt', '<=', new Date()).get().then(async result => {
    // console.log(result.docs);
    let docs = FirestoreToObject(result)
    crawl(docs);
  })
}

export const crawl = async (docs: Array<any>) => {
  let updatedData: Array<any> = []
  for (const doc of docs) {
    let STATUS = 'up';
    const title = doc.name;
    const url = doc.url
    const notification = doc.isNotified
    const interval = doc.interval
    const lastStatus = doc.status
    let statusCode = await checkState(url, doc.method)
    console.log(statusCode);
    if (statusCode != 200) {
      STATUS = 'down'
    }
    let telegram = doc.telegram;
    if (statusCode != 200 && notification) {
      // send telegram
      if (typeof telegram == 'string') {
        telegram = telegram.split(',');
      } else {
        telegram = telegram;
      }
      // for (const tg of telegram) {
      //   sendMessage({
      //     chatId: tg,
      //     text: `⛔️ Your site ${title} is DOWN. URL: ${url}`
      //   });
      // }
    }
    updatedData.push({
      url,
      title,
      id: doc.id,
      uuid: doc.uuid,
      nextRunAt: new Date(new Date().getTime() + (interval * 60000)),
      lastRunAt: new Date(),
      status: STATUS,
      lastStatus,
      statusCode,
      telegram,
      notification
    })
  }

  const asset = db.collection('assets')
  const batch = db.batch()
  for (const data of updatedData) {
    asset.doc(data.id).update({
      nextRunAt: data.nextRunAt,
      lastRunAt: data.lastRunAt,
      status: data.status
    });
    if (data.status != data.lastStatus) {
      db.collection('events').doc().create({
        status: data.status,
        date: new Date(),
        reason: data.statusCode,
        asset_uuid: data.uuid
      });
      if (data.notification) {
        if (data.status == 'up') {
          for (const tg of data.telegram) {
            console.log(tg);
            sendMessage({
              chatId: `${tg}`,
              text: `✅ Your asset ${data.title} is UP. URL: ${data.url}`
            });
          }
        } else {
          for (const tg of data.telegram) {
            sendMessage({
              chatId: `${tg}`,
              text: `⛔️ Your asset ${data.title} is DOWN. URL: ${data.url}`
            });
          }
        }
      }
    }
    batch.commit() 
  }
}

const FirestoreToObject = (result: any) => {
  let docs: Array<any> = []
  result.forEach((element: any) => {
    docs.push({
      ...element.data(),
      id: element.id
    })
  });
  return docs;
}

const checkState = async (url: string, methods: string) => {
  const NOT_FOUND = 404;
  return await axios({
    url: url,
    method: methods == 'get' ? 'GET' : methods == 'post' ? 'POST' : 'DELETE'
  }).then(res => {
    if(!res.status) return NOT_FOUND;
    return res.status;
  })
  .catch(err => {
    console.log(`cannot reach ${url}`, err);
    return NOT_FOUND;
  });
}

export default fetchAll;