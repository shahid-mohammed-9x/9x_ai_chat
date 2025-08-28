const { celebrate, Joi } = require("celebrate");

const setPasswordValidation = celebrate({
  body: Joi.object({
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
      .required()
      .label("password")
      .messages({
        "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
      }),
  })
    .required()
    .label("body"),
});

module.exports = {
  setPasswordValidation,
};
