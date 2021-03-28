import express from 'express';
const cors = require('cors')
const CronJob = require('cron').CronJob;
// rest of the code remains same
const app = express();
const PORT = 8000;

app.use(express.json())
app.use(cors())

import FirebaseAdmin from "./firebase";
import fetchAll, {crawl} from "./crawlWebInfo";
import { v4 as uuidv4 } from 'uuid';
import userMiddleware from './middleware';
import { init } from './telegram';

const firestore = FirebaseAdmin.firestore();
const assets = firestore.collection('assets');

import { body, validationResult } from 'express-validator';

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.post('/postAsset',
  userMiddleware,
  body('name').notEmpty(),
  body('interval').notEmpty(),
  body('method').notEmpty(),
  body('isNotified').notEmpty().isBoolean(),
  async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {url, interval, method, name, isNotified, telegram} = req.body;
  const session = res.locals.session;
  let notif: {
    telegram?: string[]
  } = {}
  if (isNotified) {
    notif.telegram = telegram.replace(/\s+/g, '').split(',');
  }
  const uuid = uuidv4()
  const result = await assets.doc(uuid).create({
    url, interval, method, name, isNotified, 
    uuid: uuid,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRunAt: null,
    nextRunAt: new Date(new Date().getTime() + (interval * 60000)),
    session,
    ...notif
  });
  const lastInsert = await assets.doc(uuid).get();
  let docs:any = []
  docs.push({
    ...lastInsert.data(),
    id: lastInsert.id,
  })
  await crawl(docs);
  res.json({
    lastId: result
  })
})

app.get('/getAssets', userMiddleware, async (req: express.Request, res: express.Response) => {
  try {
    const session = res.locals.session;
    const result = await assets.orderBy('createdAt', 'desc').where('session', '==', session).get()
    let docs:any = []
    result.forEach(el => {
      docs.push({
        ...el.data(),
        id: el.id,
        createdAt: el.data().createdAt.toDate(),
        updatedAt: el.data().updatedAt.toDate(),
        lastRunAt: !el.data().lastRunAt ? null : el.data().lastRunAt.toDate()
      })
    })
    res.json(docs)
  } catch (error) {
    res.status(400).json({
      description: error
    })
  }
})

app.get('/getAssetById', userMiddleware, async (req: express.Request, res) => {
  try {
    const {id}: any = req.query;
    const session = res.locals.session;
    const result = await assets.where('session', '==', session).where('uuid', '==', id).limit(1).get()
    if (result) {
      let endResult = {}
      let idx = 0;
      result.forEach((el: any) => {
        if (idx == 0) {
          endResult = {
            ...el.data(),
            id: el.id,
            createdAt: el?.data()?.createdAt.toDate(),
            updatedAt: el?.data()?.updatedAt.toDate(),
            lastRunAt: !el?.data()?.lastRunAt ? null : el?.data()?.lastRunAt.toDate()
          }
        }
        idx++;
      })
      res.json(endResult);  
    }
    
  } catch (error) {
    res.status(400).json({
      description: error
    })
  }
})

app.put('/updateAsset/:id', userMiddleware, async (req, res) => {
  try {
    const { isNotified, telegram } = req.body;
    let notif: {
      telegram?: string[]
    } = {}
    if (isNotified) {
      notif.telegram = telegram.replace(/\s+/g, '').split(',');
    }
    const result = await assets.doc(req.params.id).update({
      ...req.body,
      ...notif
    })
    res.json({
      ...result
    })
  } catch (error) {
    res.status(400).json({
      description: error
    })
  }
})

app.delete('/deleteAsset/:id', userMiddleware, (req, res) => {
  assets.doc(req.params.id).delete();
  res.json({
    status: 'deleted'
  })
})

app.get('/asset/:id/events', userMiddleware, (req, res) => {
  firestore.collection('events')
    .orderBy('date', 'desc')
    .where('asset_uuid', '==', req.params.id)
    .get().then(result => {
    let docs: Array<any> = []
    result.forEach(el => {
      docs.push({
        ...el.data(),
        date: el.data().date.toDate()
      })
    })
    docs.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    res.json(docs)
  })
})

// init telegram bot
init();

// jobs will be ran every minutes
const job = new CronJob('* * * * *', () => {
  fetchAll();
});


job.start();

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});