import {EventModel, CurrentEventModel, PostModel} from "../data/models/index.js";
import EventDto from "../dto/EventDto.js";

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
    await event.createPost();
  }

  async getCurrentEvent(chatId) {
    const currentEvent = await this.currentEventReposytory.findOne({
      where: {chatId},
      include: [{
        model: EventModel,
        include: [PostModel],
      }],
    });

    return currentEvent.Event;
  }

  async getEventDto(chatId) {
    const eventModel = await this.getCurrentEvent(chatId);
    return EventDto.fromEventModel(eventModel);
  }

  async setField(chatId, fieldName, value) {
    const event = await this.getCurrentEvent(chatId);
    event[fieldName] = value;
    await event.save();
    return event;
  }

  async setPostField(chatId, fieldName, value) {
    const event = await this.getCurrentEvent(chatId, {withModel: ['post']});
    console.log(event);
    const post = event.Post;
    console.log(post);
    post[fieldName] = value;
    await post.save();
    return post;
  }

  async getImageId(chatId) {
    const event = await this.getCurrentEvent(chatId);
    return event.image;
  }
}

export default EventService;