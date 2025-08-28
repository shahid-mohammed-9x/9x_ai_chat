const { celebrate, Joi } = require("celebrate");

const createChatValidation = celebrate({
  body: Joi.object({
    question: Joi.string().min(3).required().label("question"),
  })
    .required()
    .label("body"),
});

module.exports = {
  createChatValidation,
};
