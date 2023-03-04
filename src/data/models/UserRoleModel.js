import sequelize from "../sequelize/index.js";
import {DataTypes} from "sequelize";
import UserModel from "./UserModel.js";

const UserRoleModel = sequelize.define('userRole', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  role: {
    type: DataTypes.INTEGER,
  }
},
  {
    timestamps: false
  });

UserRoleModel.belongsTo(UserModel, {as: 'user'});

export default UserRoleModel;