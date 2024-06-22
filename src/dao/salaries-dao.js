const SalariesModel = require("../model/salaries-model");
const Utility = require("../utils/utility");
const SalariesDAO = {
  salaryPaid: (payload) => {
    console.log("data inside dao", payload);
    let date = new Date();
    let totalAmount =
      (parseInt(payload.amount.food) || 0) +
      (parseInt(payload.amount.rent) || 0) +
      (parseInt(payload.amount.living) || 0);
    let getDateCode = `${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    return new SalariesModel({
      ...payload,
      salariesPaidId: `SAL-${Utility.generateUID()}-AVTSL-${getDateCode}`,
      totalAmount,
    }).save();
  },
  isClientExist: (payload) => {
    return SalariesModel.findOne({
      email: payload.email,
      phone: payload.phone,
    });
  },
  getSalariesByUserName: (payload) => {
    let obj = payload || {};
    // obj.active = true;
    return SalariesModel.find(obj, { _id: 0 }).populate({
      path: "userId",
      select: { _id: 0, password: 0 },
    });
  },
  deleteData: (params, body) => {
    return SalariesModel.updateOne(
      { salariesPaidId: params.salariesPaidId },
      { $set: body }
    );
  },
  updateData: (params, body) => {
    return SalariesModel.updateOne(
      { salariesPaidId: params.salariesPaidId },
      { $set: body }
    );
  },
};
module.exports = SalariesDAO;
