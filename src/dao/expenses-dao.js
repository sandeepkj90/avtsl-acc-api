const ExpensesModel = require('../model/expenses-model');
const Utility = require('../utils/utility');
const ExpensesDAO = {
  expenseAdd: (payload) => {
    console.log('data inside dao', payload);
    let date = (payload.date)?new Date(payload.date):new Date();
    let getDateCode = `${((date.getMonth()+1)<10)?'0'+(date.getMonth()+1):date.getMonth()+1}-${(date.getDate()<10)?'0'+date.getDate():date.getDate()}`; 
    return new ExpensesModel({
      ...payload,expenseId:`EXPENSES-${payload.userName.toUpperCase()}-${Utility.generateUID()}-AVTSL-${getDateCode}`
    }).save();
  },
  getExpensesByCondition: (payload) => {
    let obj = payload || {};
    return ExpensesModel.find(obj,{_id:0});
  },
};
module.exports = ExpensesDAO;
