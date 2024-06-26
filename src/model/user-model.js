const mongoose = require("../../database");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  userName: {
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
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["SUPER-ADMIN", "ADMIN", "EMPLOYEE", "OPERATOR"],
    default: "EMPLOYEE",
  },
  salary: {
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
    default: 1234,
  },
  legalDocs: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["APPROVED", "INPROGRESS", "BLOCKED"],
    default: "INPROGRESS",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  month: {
    type: String,
    default: "",
  },
  year: {
    type: String,
    default: "",
  },
  day: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model(Constant.COLLECTION_NAME.USER, UserSchema);
