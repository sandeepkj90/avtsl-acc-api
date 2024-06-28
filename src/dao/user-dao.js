const UserModel = require("../model/user-model");
const Utility = require("../utils/utility");
const UserDAO = {
	register: async (payload) => {
		console.log("data inside dao", payload);
		let result = (
			await UserModel.aggregate([
				{ $match: {} },
				{ $project: { _id: 0, userName: 1 } },
				{ $unwind: "$userName" },
				{ $group: { _id: null, result: { $addToSet: "$userName" } } },
			])
		)[0]?.result;

		if (result?.length > 0) result = Utility.calcUserId(result);
		else result = "01";
		// console.log(result);
		// return true;
		return new UserModel({
			userName: `AV${result}`,
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
			{ $set: { otp: otp } },
		);
	},
	verifyOTP: (payload) => {
		return UserModel.findOne({ email: payload.email, otp: payload.otp });
	},
	updatePassword: (payload) => {
		return UserModel.updateOne(
			{ email: payload.email },
			{ $set: { password: payload.password } },
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
		if (!obj.active) {
			obj["active"] = true;
		}
		return UserModel.find(obj, { password: 0 }).sort({ date: -1 });
	},
	approve: (payload) => {
		return UserModel.updateOne(
			{ userName: payload.userName },
			{ $set: { status: "APPROVED" } },
		);
	},
	getTechnician: () => {
		return UserModel.find(
			{ role: "TECHNICIAN", status: "APPROVED" },
			{ _id: 1, firstName: 1, phone: 1, skills: 1 },
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
