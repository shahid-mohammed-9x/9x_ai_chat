const httpErrors = require("http-errors");
// models
const userModel = require("../../schema/user.model");
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
    const { question } = req.body;
    const userId = req.user?._id || null;

    const newChatDetails = {
      title: question.substring(0, 20) + "...",
      isAnonymous: !userId,
    };

    const newChat = new chatModel(newChatDetails);

    await newChat.save();

    // api =qustion

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
