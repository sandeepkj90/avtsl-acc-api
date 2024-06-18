const InvestmentsDAO = require("../dao/investment-dao");
const Constant = require("../utils/constant");
const InvestmentsService = {
  investmentAdd: (payload) => {
    console.log("data inside service", payload);
    return new Promise(async (resolve, reject) => {
      InvestmentsDAO.investmentAdd(payload)
        .then((result) => {
          resolve({
            status: 201,
            data: result,
            message: Constant.MESSAGE.INVESTMENT.ADD,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
  getInvestmentsByCondition: (payload) => {
    console.log("data inside service", payload);
    return new Promise((resolve, reject) => {
      InvestmentsDAO.getInvestmentsByCondition(payload)
        .then((result) => {
          resolve({
            status: 200,
            data: result,
            message: Constant.MESSAGE.INVESTMENT.FOUND,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
};
module.exports = InvestmentsService;
