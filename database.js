const mongoose = require("mongoose");
const Constant = require("./src/utils/constant");
// require("dotenv").config();
// let database_url = process.env.MONGODB_URL;
mongoose
  .connect(
    "mongodb+srv://sandeepkj90:avtsl%40sandy@cluster0.0votf7u.mongodb.net/avtsl-acc?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected!"));
module.exports = mongoose;
