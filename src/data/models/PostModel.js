import sequelize from "../sequelize/index.js";
import {STRING} from "sequelize";

const PostModel = sequelize.define('Post', {
  fb: {
    type: STRING,
  },
  instagram: {
    type: STRING,
  },
}, {
    timestamps: false
});

export default PostModel;