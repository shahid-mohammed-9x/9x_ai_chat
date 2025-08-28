const { celebrate, Joi } = require("celebrate");
// const passwordComplexity = require("joi-password-complexity");

const checkUserValidation = celebrate({
  body: Joi.object({
    userInput: Joi.string().min(3).required().label("userInput"),
  })
    .required()
    .label("body"),
});

module.exports = {
  checkUserValidation,
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
