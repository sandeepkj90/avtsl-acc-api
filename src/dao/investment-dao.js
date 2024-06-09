const InvestmentsModel = require('../model/investment-model');
const Utility = require('../utils/utility');
const InvestmentsDAO = {
  investmentAdd: (payload) => {
    console.log('data inside dao', payload);
    let date = (payload.date)?new Date(payload.date):new Date();
    let getDateCode = `${((date.getMonth()+1)<10)?'0'+(date.getMonth()+1):date.getMonth()+1}-${(date.getDate()<10)?'0'+date.getDate():date.getDate()}`; 
    return new InvestmentsModel({
      ...payload,investmentId:`INVESTMENT-${payload.userName.toUpperCase()}-${Utility.generateUID()}-AVTSL-${getDateCode}`
    }).save();
  },
  getInvestmentsByCondition: (payload) => {
    let obj = payload || {};
    return InvestmentsModel.find(obj,{_id:0});
  },
};
module.exports = InvestmentsDAO;
