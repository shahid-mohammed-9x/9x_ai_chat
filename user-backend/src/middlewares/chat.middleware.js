const httpErrors = require("http-errors");
// models
const chatModel = require("../schema/chat.model");

// utils
const errorHandling = require("../utils/errorHandling.util");
const logger = require("../config/logger.config");

// authorization depending  upon a role
module.exports.CheckUserChatMiddleWare = (isAnonymous = false) => {
  return async (req, res, next) => {
    const { chatId } = req.params;
    const userId = req.user._id;
    logger.info("chat - middleware - CheckUserChatMiddleware");
    const isChatExist = await chatModel.findOne({ _id: chatId, user: userId });
    if (isChatExist) {
      req.orderQuestion = isChatExist.messages.length - 1;
      next();
    } else {
      return next(httpErrors.BadRequest("given chatId details not exist"));
    }
  };
};
