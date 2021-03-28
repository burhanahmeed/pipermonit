const config = require('./config');

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.token, {
  polling: true
});

const sendMessage = ({
  chatId,
  text
}) => {
  bot.sendMessage(chatId, text, {parse_mode: "HTML"})
  .then(result => console.log(result))
  .catch(err => console.log(err));
}

const init = () => {
  bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, `Welcome to PiperMonit 🙌 \nYour chat ID is: <b>${msg.chat.id}</b>`, {
      parse_mode: "HTML"
    }).catch((error) => {
      console.log(error.code); // => 'ETELEGRAM'
      console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
    });
  });
  
  bot.onText(/^((?!(\/start)).)*$/, msg => {
    bot.sendMessage(msg.chat.id, `Hello. Bot have only one command - /start`).catch((error) => {
      console.log(error.code); // => 'ETELEGRAM'
      console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
    });
  });
}

module.exports = {
  init,
  sendMessage
}
