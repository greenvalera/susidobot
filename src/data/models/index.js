import CurrentEventModel from "./CurrentEventModel.js";
import EventModel from "./EventModel.js";
import PostModel from "./PostModel.js";

EventModel.sync();
PostModel.sync();
CurrentEventModel.sync();

export {EventModel, CurrentEventModel, PostModel};