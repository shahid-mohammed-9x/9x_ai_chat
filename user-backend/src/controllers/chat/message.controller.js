const httpErrors = require("http-errors");
// models
const chatModel = require("../../schema/chat.model");
const messageModel = require("../../schema/message.model");
// config
const logger = require("../../config/logger.config");
// utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
// constants
const sortConstants = require("../../constants/sort.constants");
const axiosService = require("../../services/axios.service");

// new question
const newQuestionController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - messsage.controller - newQuestionController - start"
    );

    const userId = req.user?._id || null;
    const { chatId } = req.params;
    // const isChatExist = await chatModel.findOne({ _id: chatId, user: userId });

    // if (!isChatExist) {
    //   return next(httpErrors.NotFound("Chat not found"));
    // }

    const json = {
      question: "hello",
      user_id: userId,
      session_id: chatId,
      context: null,
      models: ["gemini"],
    };
    const response = await axiosService.fetchPost("/chat", json);
    console.log(response);

    logger.info(
      "controller - chat - message.controller - newQuestionController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "Success new question is created",
      data: response,
    });
  } catch (error) {
    logger.error(
      "controller - chat - message.controller - newQuestionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  newQuestionController,
};
