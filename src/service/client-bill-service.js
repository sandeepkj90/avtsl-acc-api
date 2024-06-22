const ClientBillDAO = require("../dao/client-bill-dao");
const Constant = require("../utils/constant");
const ClientBillService = {
  addBill: (payload) => {
    console.log("data inside service", payload);
    return new Promise(async (resolve, reject) => {
      ClientBillDAO.addBill(payload)
        .then((result) => {
          resolve({
            status: 201,
            data: result,
            message: Constant.MESSAGE.CLIENT_BILL.ADDED,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
  getBillByUserName: (payload) => {
    console.log("data inside service", payload);
    return new Promise((resolve, reject) => {
      ClientBillDAO.getBillByUserName(payload)
        .then((result) => {
          resolve({
            status: 200,
            data: result,
            message:
              result.length > 0
                ? Constant.MESSAGE.CLIENT_BILL.FOUND
                : "No data found",
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
  billPaid: (payload) => {
    console.log("data inside service", payload);
    return new Promise(async (resolve, reject) => {
      let data = await ClientBillDAO.billPaid(payload);
      console.log("inside service approved", data);
      resolve({
        status: 200,
        data: data,
        message: "Bill paid successfully.",
      });
    });
  },
};
module.exports = ClientBillService;
