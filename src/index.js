const TelegramBot = require('node-telegram-bot-api');

const token = '5887562782:AAFj9QvVTKMIOL8AaZndAvsxYNIq6FU3DoI';

const bot = new TelegramBot(token, {polling: true});



bot.onText(/\/form/, (msg) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Данні про івент', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: "Додати імʼя",
          callback_data: 'name',
        }],
        [{
          text: "Додати дату",
          callback_data: 'date',
        }],
        [{
          text: "Додати місце",
          callback_data: 'place',
        }],
        [{
          text: "Додати опис",
          callback_data: 'description',
        }],
      ]
    }
  })
});

//TODO: add callbacks