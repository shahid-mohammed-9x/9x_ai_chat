const httpErrors = require("http-errors");
// models
const userModel = require("../../schema/user.model");
const chatModel = require("../../schema/chat.model");
const messageModel = require("../../schema/message.model");
// config
const logger = require("../../config/logger.config");
// utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");

const createChatController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - chat.controller - createChatController - start"
    );
    const { question, models = [] } = req.body;
    const userId = req.user?._id || null;

    const newMessageDetails = {
      user: userId,
      question: question,
      responses: models.reduce((acc, model) => {
        acc[model] = { answer: null, inputTokens: 0, outputTokens: 0 };
        return acc;
      }, {}),
      order: 0,
    };

    const newChatDetails = {
      title: question.substring(0, 20) + "...",
      isAnonymous: !userId,
    };

    const newMessage = new messageModel(newMessageDetails);
    const newChat = new chatModel(newChatDetails);

    newMessage.chat = newChat._id;
    newChat.responses.push(newMessage._id);

    await newMessage.save();
    await newChat.save();

    logger.info(
      "controller - chat - chat.controller - createChatController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully public chat created",
      data: newChat,
    });
  } catch (error) {
    logger.error(
      "controller - chat - chat.controller - createChatController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createChatController,
};
