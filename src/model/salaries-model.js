const mongoose = require("../../database");
const Constant = require("../utils/constant");
const Schema = mongoose.Schema;

const SalariesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    require: true,
  },
  salariesPaidId:{
    type: String,
    require: true,
  },
  userName:{
    type: String,
    require: true,
  },
  amount:{
    food:{
        type:Number,
        default:0
    },
    rent:{
        type:Number,
        default:0
    },
    living:{
        type:Number,
        require:true
    }
    
  },
  type:{
    type: String,
    enum: ["ADVANCE", "NORMAL"],
    default: "NORMAL",
  },
  totalAmount:{
    type:Number,
        require:true
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
    default: "PAID",
  },
  active:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model(Constant.COLLECTION_NAME.SALARIES, SalariesSchema);
