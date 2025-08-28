const { celebrate, Joi } = require("celebrate");

const verifyRegisterUserOTPValidation = celebrate({
  body: Joi.object({
    otp: Joi.string()
      .length(4) // assuming OTP is 4 digits
      .pattern(/^\d+$/) // only digits
      .required()
      .trim()
      .label("OTP"),
  })
    .required()
    .label("body"),
});

module.exports = {
  verifyRegisterUserOTPValidation,
};
