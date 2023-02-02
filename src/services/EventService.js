import {EventModel, CurrentEventModel} from "../data/models/index.js";

class EventService {
  constructor() {
    this.eventReposytory = EventModel;
    this.currentEventReposytory = CurrentEventModel;
  }

  async createEvent({chatId, userId}) {
    const event = await this.eventReposytory.create({chatId, userId});
    const eventId = event.id;
    const currentEventModel = await this.currentEventReposytory.findOne({where: {chatId}});
    if (currentEventModel) {
      currentEventModel.EventId = eventId;
      await currentEventModel.save();
    } else {
      await this.currentEventReposytory.create({chatId, EventId: eventId});
    }
  }

  async setName(chatId, name) {
    const event = await this.getCurrentEvent(chatId);
    event.name = name;
    await event.save();
    return event;
  }

  async setField(chatId, fieldName, value) {
    const event = await this.getCurrentEvent(chatId);
    event[fieldName] = value;
    await event.save();
    return event;
}

  async getCurrentEvent(chatId) {
    const currentEvent = await this.currentEventReposytory.findOne({
      where: {chatId},
      include: EventModel,
    });

    return currentEvent.Event;
  }

  async getImageId(chatId) {
    const event = await this.getCurrentEvent(chatId);
    return event.image;
  }
}

export default EventService;