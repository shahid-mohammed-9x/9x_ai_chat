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

const chatsListValidation = celebrate({
  query: Joi.object({
    limit: Joi.number().min(1).label("limit"),
    page: Joi.number().min(1).label("page"),
    sort: Joi.string().valid("createdAt", "-createdAt").label("sort"),
  })
    .required()
    .label("query"),
});

const messageListValidation = celebrate({
  query: Joi.object({
    limit: Joi.number().min(1).label("limit"),
    page: Joi.number().min(1).label("page"),
    sort: Joi.string().valid("createdAt", "-createdAt").label("sort"),
  })
    .required()
    .label("query"),
});

module.exports = {
  createChatValidation,
  chatsListValidation,
  messageListValidation,
};
