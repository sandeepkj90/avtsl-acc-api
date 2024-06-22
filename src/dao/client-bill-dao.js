const ClientBillModel = require("../model/client-bill-model");
const Utility = require("../utils/utility");
const ClientBillDAO = {
  addBill: (payload) => {
    console.log("data inside dao", payload);
    let date = payload.date ? new Date(payload.date) : new Date();
    let getDateCode = `${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    return new ClientBillModel({
      ...payload,
      billId: `BILL-${payload.userName.toUpperCase()}-${Utility.generateUID()}-AVTSL-${getDateCode}`,
    }).save();
  },
  isClientExist: (payload) => {
    return ClientBillModel.findOne({
      email: payload.email,
      phone: payload.phone,
    });
  },
  getBillByUserName: (payload) => {
    let obj = payload || {};
    obj.active = true;
    return ClientBillModel.find(obj, { _id: 0 }).populate({
      path: "clientId",
      select: { _id: 0 },
    });
  },
  billPaid: (payload) => {
    return ClientBillModel.updateOne(
      { billId: payload.billId },
      { $set: { status: "PAID" } }
    );
  },
};
module.exports = ClientBillDAO;
