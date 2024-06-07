const ClientModel = require('../model/client-model');
const ClientDAO = {
  register: (payload) => {
    console.log('data inside dao', payload);
    return new ClientModel({
      ...payload,
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
