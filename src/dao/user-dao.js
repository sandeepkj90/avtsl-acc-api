const UserModel = require("../model/user-model");
const UserDAO = {
  register: (payload) => {
    let code = payload.phone.toString();
    console.log("data inside dao", payload);
    return new UserModel({
      userName: `${payload.firstName.toLowerCase()}${code.slice(
        0,
        2
      )}${code.slice(code.length - 2, code.length)}avtsl`,
      ...payload,
    }).save();
  },
  isUserExist: (payload) => {
    return UserModel.findOne({
      userName: payload.userName,
    });
  },
  getByCondition: (payload) => {
    return UserModel.find(payload);
  },
  updateOTP: (payload, otp) => {
    return UserModel.updateOne(
      { email: payload.email },
      { $set: { otp: otp } }
    );
  },
  verifyOTP: (payload) => {
    return UserModel.findOne({ email: payload.email, otp: payload.otp });
  },
  updatePassword: (payload) => {
    return UserModel.updateOne(
      { email: payload.email },
      { $set: { password: payload.password } }
    );
  },
  getEmployeeList: (payload) => {
    let obj = payload || {};
    if (payload.role) {
      obj.role = { $ne: payload.role };
    } else {
      obj["role"] = "EMPLOYEE";
    }
    console.log(obj);
    return UserModel.find(obj, { password: 0 });
  },
  approve: (payload) => {
    return UserModel.updateOne(
      { userName: payload.userName },
      { $set: { status: "APPROVED" } }
    );
  },
  getTechnician: () => {
    return UserModel.find(
      { role: "TECHNICIAN", status: "APPROVED" },
      { _id: 1, firstName: 1, phone: 1, skills: 1 }
    );
  },
  deleteData: (params, body) => {
    return UserModel.updateOne({ userName: params.userName }, { $set: body });
  },
  updateData: (params, body) => {
    return UserModel.updateOne({ userName: params.userName }, { $set: body });
  },
};
module.exports = UserDAO;
