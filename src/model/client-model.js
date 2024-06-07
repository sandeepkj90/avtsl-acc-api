const mongoose = require("../../database");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    default: "",
  },
  legalDocs: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(Constant.COLLECTION_NAME.CLIENT, ClientSchema);
