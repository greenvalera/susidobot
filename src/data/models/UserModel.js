import sequelize from "../sequelize/index.js";
import {STRING} from "sequelize";

const UserModel = sequelize.define('user', {
  id: {
    type: STRING,
    primaryKey: true,
  },
  name: {
    type: STRING
  }
},
  {
    timestamps: false
  });

export default UserModel;