const jwt = require("jsonwebtoken");
const Constant = require("./constant");
const Utility = {
  generateOTP: () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  },
  generateUID: () => {
    const uid = Math.floor(1000 + Math.random() * 9000);
    return uid;
  },
  createToken: (payload) => {
    console.log("payload to create token", payload);
    const token = jwt.sign(
      {
        name: payload.firstName + " " + payload.lastName,
        email: payload.email,
        role: payload.role,
        _id: payload._id,
      },
      Constant.SECRET_KEY
    );
    return token;
  },
  verifyToken: (payload) => {
    let resposneData = jwt.verify(payload, Constant.SECRET_KEY);
    return resposneData;
  },
};
module.exports = Utility;
