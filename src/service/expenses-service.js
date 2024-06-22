const ExpensesDAO = require("../dao/expenses-dao");
const Constant = require("../utils/constant");
const ExpensesService = {
  expenseAdd: (payload) => {
    console.log("data inside service", payload);
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
    console.log("data inside service", payload);
    return new Promise((resolve, reject) => {
      ExpensesDAO.getExpensesByCondition(payload)
        .then((result) => {
          resolve({
            status: 200,
            data: result,

            message:
              result.length > 0
                ? Constant.MESSAGE.EXPENSE.FOUND
                : "No data found",
          });
        })
        .catch((error) => {
          reject({ status: 500, message: error });
        });
    });
  },
  deleteData: (params, body) => {
    console.log("data inside service", params, body);
    return new Promise(async (resolve, reject) => {
      let data = await ExpensesDAO.deleteData(params, body);
      console.log("inside service approved", data);
      resolve({
        status: 200,
        data: data,
        message: "Expense deleted successfully.",
      });
    });
  },

  updateData: (params, body) => {
    console.log("data inside service", params, body);
    return new Promise(async (resolve, reject) => {
      let data = await ExpensesDAO.updateData(params, body);
      console.log("inside service approved", data);
      resolve({
        status: 200,
        data: data,
        message: "Expense updated successfully.",
      });
    });
  },
};
module.exports = ExpensesService;
