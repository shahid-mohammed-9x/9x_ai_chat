const { celebrate, Joi } = require("celebrate");
// const passwordComplexity = require("joi-password-complexity");

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

const loginUserValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().label("email"),
  })
    .required()
    .label("body"),
});

module.exports = {
  verifyRegisterUserOTPValidation,
  loginUserValidation,
};

// password: Joi.string()
//       .min(8)
//       .max(30)
//       .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
//       .required()
//       .label("password")
//       .messages({
//         "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
//       }),
