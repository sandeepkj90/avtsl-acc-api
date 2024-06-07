const ClientDAO = require('../dao/client-dao');
const Constant = require('../utils/constant');
const Utility = require('../utils/utility');
const ClientService = {
  register: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      let data = await ClientDAO.isClientExist(payload);
      console.log('data fetched from database based on email', data);
      if (data) {
        reject({ status: 406, message: Constant.MESSAGE.CLIENT.ISEXIST });
      } else {
        ClientDAO.register(payload)
          .then((result) => {
            resolve({
              status: 201,
              data: result,
              message: Constant.MESSAGE.CLIENT.REGISTERED,
            });
          })
          .catch((error) => {
            reject({ status: 500, message: error });
          });
      }
    });
  },
  getClientList: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
      let data = await ClientDAO.getClientList(payload);
      console.log('data fetched from database based on email', data);
      resolve({ data });
    });
  }
  
};
module.exports = ClientService;
