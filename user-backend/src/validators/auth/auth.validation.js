const { celebrate, Joi } = require("celebrate");
// const passwordComplexity = require("joi-password-complexity");

const loginUserValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().label("email"),
  })
    .required()
    .label("body"),
});

module.exports = {
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
