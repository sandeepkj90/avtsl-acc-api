const mongoose = require("../../database");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema({
userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true,
     },
  expenseId:{
    type: String,
    require: true,
  },
  type:{
    type: String,
    enum: ["GENERAL", "TRAVEL","FOOD","STATIONARY","TOOLS"],
    default: "GENERAL",
  },
  userName:{
    type: String,
    require: true,
  },
  amount:{
        type:Number,
        require:true
  },
  description:{
    type:String,
        require:true
  },
  month: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model(Constant.COLLECTION_NAME.EXPENSES, ExpensesSchema);
