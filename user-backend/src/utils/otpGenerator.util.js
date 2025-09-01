const crypto = require("crypto");

module.exports.generateOTP = (digit = 6) => {
  if (digit < 1) throw new Error("Digit must be at least 1");

  const min = Math.pow(10, digit - 1);
  const max = Math.pow(10, digit) - 1;

  return crypto.randomInt(min, max + 1);
};
