const SalariesDAO = require("../dao/salaries-dao");
const Constant = require("../utils/constant");
const SalariesService = {
  salaryPaid: (payload) => {
    console.log("data inside service", payload);
    return new Promise(async (resolve, reject) => {
      SalariesDAO.salaryPaid(payload)
        .then((result) => {
          resolve({
            status: 201,
            data: result,
            message: Constant.MESSAGE.SALARIES.PAID,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
  getSalariesByUserName: (payload) => {
    console.log("data inside service", payload);
    return new Promise((resolve, reject) => {
      SalariesDAO.getSalariesByUserName(payload)
        .then((result) => {
          resolve({
            status: 200,
            data: result,
            message: Constant.MESSAGE.SALARIES.FOUND,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
};
module.exports = SalariesService;
