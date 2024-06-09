const ExpensesDAO = require('../dao/expenses-dao');
const Constant = require('../utils/constant');
const ExpensesService = {
    expenseAdd: (payload) => {
    console.log('data inside service', payload);
    return new Promise(async (resolve, reject) => {
        ExpensesDAO.expenseAdd(payload)
        .then((result) => {
          resolve({
            status: 201,
            data: result,
            message: Constant.MESSAGE.EXPENSE.ADD,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
  getExpensesByCondition: (payload) => {
    console.log('data inside service', payload);
    return new Promise( (resolve, reject) => {

      ExpensesDAO.getExpensesByCondition(payload)
        .then((result) => {
          resolve({
            status: 200,
            data: result,
            message: Constant.MESSAGE.EXPENSE.FOUND,
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  }
  
};
module.exports = ExpensesService;
