import {STRING} from "sequelize";
import sequelize from "../sequelize/index.js";
import EventModel from "./EventModel.js";

const CurrentEventModel = sequelize.define('CurrentEvent', {
    chatId: {
      type: STRING,
      unique: true,
    },
  },
  {
      timestamps: false
    }
  );

CurrentEventModel.belongsTo(EventModel);

CurrentEventModel.sync();

export default CurrentEventModel;