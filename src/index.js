import * as dotenv from 'dotenv';
import TelegramBot from "node-telegram-bot-api";
import EventService from "./services/EventService.js";
import BotService from "./services/BotService.js";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const botService = new BotService(bot);

const eventService = new EventService();

bot.onText(/\/show/, async (msg) => {
  await botService.sendEvent(msg.chat.id)
});

bot.onText(/\/create/, (msg) => {
  try {
    const chatId = msg.chat.id;
    eventService.createEvent({
      chatId,
      userId: msg.from.id,
    });

    bot.sendMessage(chatId, 'Створено новий івент. Для перегляду скористайтеся командою /show')
  } catch (e) {
    console.log(e);
  }
});

bot.on("callback_query", async (msg) => {
  const chatId = msg.message.chat.id;
  const formMessageId = msg.message.message_id;

  switch (msg.data) {
    case "add_name":
    case "edit_name":
      await botService.requestUpdateField(chatId, formMessageId, 'name', 'Введіть назву');
      break;
    case "add_date":
    case "edit_date":
      await botService.requestUpdateField(chatId, formMessageId, 'date', 'Введіть дату');
      break;
    case "add_location":
    case "edit_location":
      await botService.requestUpdateField(chatId, formMessageId, 'location', 'Введіть місце');
      break;
    case "add_description":
    case "edit_description":
      await botService.requestUpdateField(chatId, formMessageId, 'description', 'Введіть текст івенту');
      break;
    case "add_image":
    case "edit_image":
      await botService.requestUpdateImage(chatId, formMessageId);
      break;
    case "show_image":
      await botService.showImage(chatId, formMessageId);
      break;
    case "add_fb":
      await botService.requestUpdatePostField(chatId, formMessageId, 'fb', 'Введіть посилання на facebook event');
      break;
    default:
      new Error('Command not found');
  }
});