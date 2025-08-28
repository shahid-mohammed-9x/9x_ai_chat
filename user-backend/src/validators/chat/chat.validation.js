const { celebrate, Joi } = require("celebrate");

const createChatValidation = celebrate({
  body: Joi.object({
    question: Joi.string().min(3).required().label("question"),
    models: Joi.array()
      .items(Joi.string().valid("gpt", "claude", "gemini", "deepseek", "grok"))
      .min(1)
      .required()
      .label("Models"),
  })
    .required()
    .label("body"),
});

module.exports = {
  createChatValidation,
};
