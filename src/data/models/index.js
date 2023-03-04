import CurrentEventModel from "./CurrentEventModel.js";
import EventModel from "./EventModel.js";
import PostModel from "./PostModel.js";
import UserModel from "./UserModel.js";
import UserRoleModel from "./UserRoleModel.js";

EventModel.sync();
PostModel.sync();
CurrentEventModel.sync();
UserModel.sync();
UserRoleModel.sync();

export {EventModel, CurrentEventModel, PostModel, UserModel, UserRoleModel};