const { celebrate, Joi } = require("celebrate");
// const passwordComplexity = require("joi-password-complexity");

const checkUserValidation = celebrate({
  body: Joi.object({
    userInput: Joi.string().min(3).required().label("userInput"),
  })
    .required()
    .label("body"),
});

const sendEmailOTPValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().label("email"),
  })
    .required()
    .label("body"),
});

const verifyOTPValidation = celebrate({
  body: Joi.object({
    otp: Joi.string()
      .length(4) // assuming OTP is 4 digits
      .pattern(/^\d+$/) // only digits
      .required()
      .trim()
      .label("OTP"),
    email: Joi.string().email().required().label("email"),
  })
    .required()
    .label("body"),
});

module.exports = {
  checkUserValidation,
  sendEmailOTPValidation,
  verifyOTPValidation,
};
