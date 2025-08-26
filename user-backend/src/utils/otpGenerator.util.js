const crypto = require("crypto");

module.exports.generateOTP = () => {
  // generate a otp of 4digit number
  const otp = crypto.randomInt(1000, 9999);
  return otp;
};
