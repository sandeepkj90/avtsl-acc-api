const mongoose = require("../../database");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const ClientBillSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  billId: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model(
  Constant.COLLECTION_NAME.CLIENT_BILL,
  ClientBillSchema
);
