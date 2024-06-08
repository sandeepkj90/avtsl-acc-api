const ClientModel = require('../model/client-model');
const ClientDAO = {
  register: (payload) => {
    console.log('data inside dao', payload);
    let code = payload.phone.toString();
    return new ClientModel({
      userName:`${payload.firstName.toLowerCase()}${code.slice(0,2)}${code.slice(code.length-2,code.length)}`,
      ...payload
    }).save();
  },
  isClientExist: (payload) => {
    return ClientModel.findOne({
      email: payload.email,
      phone: payload.phone
    });
  },
  getClientList: (payload) => {
    let obj = payload || {};
    return ClientModel.find(obj,{_id:0});
  }
};
module.exports = ClientDAO;
