import {DataTypes, STRING} from "sequelize";
import sequelize from "../sequelize/index.js";

const EventModel = sequelize.define('Event', {
  'id': {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  chatId: {
    type: STRING,
  },
  userId: {
    type: STRING,
  },
  name: {
    type: STRING,
  },
  date: {
    type: STRING,
  },
  location: {
    type: STRING,
  },
  image: {
    type: STRING,
  },
  description: {
    type: STRING,
  },
});

EventModel.sync();

export default EventModel;