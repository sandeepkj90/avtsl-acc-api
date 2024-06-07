const mongoose = require('mongoose');
const Constant = require('./src/utils/constant');

mongoose.connect(`mongodb://localhost/${Constant.DATABASE_NAME}`)
  .then(() => console.log('Connected!'));
module.exports = mongoose;
