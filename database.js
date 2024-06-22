const mongoose = require("mongoose");
const Constant = require("./src/utils/constant");
// require("dotenv").config();
let database_url = process.env.MONGODB_URL;
mongoose.connect(database_url).then(() => console.log("Connected!"));
module.exports = mongoose;
