const mongoose = require("../../database");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const InvestmentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  investmentId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  month: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model(
  Constant.COLLECTION_NAME.INVESTMENT,
  InvestmentsSchema
);
