import getButtons from "../utils/getButtons.js";
import EventService from "./EventService.js";
import getEventText from "../utils/getEventText.js";

class BotService {
  constructor(bot) {
    this.bot = bot;
    this.eventService = new EventService();
  }

  async sendEvent(chatId) {
    const event = await this.eventService.getEventDto(chatId);
    const buttons = getButtons(event);
    const content = getEventText(event);

    await this.bot.sendMessage(chatId, content, {
      reply_markup: {
        inline_keyboard: buttons
      }
    });
  }

  async refreshEvent(chatId, messageId) {
    const event = await this.eventService.getEventDto(chatId);
    const buttons = getButtons(event);
    const content = getEventText(event);

    const params = {
      chat_id: chatId,
      message_id: messageId
    };

    this.bot.editMessageText(content, params);

    this.bot.editMessageReplyMarkup(
      {
          inline_keyboard: buttons,
      },
      params
    );
  }

  async sendQuestion(chatId, text) {
    return await this.bot.sendMessage(
      chatId,
      text,
      {
        reply_markup: {
          force_reply: true,
        },
      });
  }

  async requestUpdateField(chatId, formMessageId, fieldName, questionText) {
    const promptMessage = await this.sendQuestion(chatId, questionText);

    this.bot.onReplyToMessage(chatId, promptMessage.message_id, async (msg) => {
      await this.eventService.setField(chatId, fieldName, msg.text);
      await this.refreshEvent(chatId, formMessageId)
    });
  }

  async requestUpdatePostField(chatId, formMessageId, fieldName, questionText) {
    const promptMessage = await this.sendQuestion(chatId, questionText);

    this.bot.onReplyToMessage(chatId, promptMessage.message_id, async (msg) => {
      await this.eventService.setPostField(chatId, fieldName, msg.text);
      await this.refreshEvent(chatId, formMessageId)
    });
  }

  async requestUpdateImage(chatId, formMessageId) {
    const promptMessage = await this.sendQuestion(chatId, 'Завантажте будь ласка картинку у відповідь на це повідомлення');

    this.bot.onReplyToMessage(chatId, promptMessage.message_id, async (msg) => {
      if (!msg.photo || !msg.photo.length) {
        await this.bot.sendMessage(chatId, 'Після того як натиснули кнопку "Додати зображення" треба завантажити картинку у відповідь на запит.');
        return;
      }

      const photoId = msg.photo[0].file_id;

      await this.eventService.setField(chatId, 'image', photoId);
      await this.refreshEvent(chatId, formMessageId)
    });
  }

  async showImage(chatId) {
    const imageId = await this.eventService.getImageId(chatId);
    await this.bot.sendPhoto(chatId, imageId);
  }
}

export default BotService;