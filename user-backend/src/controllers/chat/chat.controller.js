const httpErrors = require("http-errors");
// models
const userModel = require("../../schema/user.model");
// config
const logger = require("../../config/logger.config");
// utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");

const createPublicChatController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - chat.controller - createPublicChatController - start"
    );
    const { title } = req.body;

    const newChat = new chatModel({
      title,
    });

    await newChat.save();

    logger.info(
      "controller - chat - chat.controller - createPublicChatController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully public chat created",
      data: newChat,
    });
  } catch (error) {
    logger.error(
      "controller - chat - chat.controller - createPublicChatController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};
