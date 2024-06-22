const ExpensesModel = require("../model/expenses-model");
const Utility = require("../utils/utility");
const ExpensesDAO = {
  expenseAdd: (payload) => {
    console.log("data inside dao", payload);
    let date = payload.date ? new Date(payload.date) : new Date();
    let getDateCode = `${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    return new ExpensesModel({
      ...payload,
      expenseId: `EXP-${Utility.generateUID()}-AVTSL-${getDateCode}`,
    }).save();
  },
  getExpensesByCondition: (payload) => {
    let obj = payload || {};
    // obj.active = true;
    return ExpensesModel.find(obj, { _id: 0 }).populate({
      path: "userId",
      select: { _id: 0 },
    });
  },
  deleteData: (params, body) => {
    return ExpensesModel.updateOne(
      { expenseId: params.expenseId },
      { $set: body }
    );
  },
  updateData: (params, body) => {
    return ExpensesModel.updateOne(
      { expenseId: params.expenseId },
      { $set: body }
    );
  },
};
module.exports = ExpensesDAO;
