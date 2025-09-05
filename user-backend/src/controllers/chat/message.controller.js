const httpErrors = require("http-errors");
// models
const chatModel = require("../../schema/chat.model");
const messageModel = require("../../schema/message.model");
const summaryModel = require("../../schema/summary.model");
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

    const userId = req.user?._id;
    const { chatId } = req.params;
    const { question, models = [] } = req.body;

    const details = {
      user: userId.toString(),
      chat: chatId.toString(),
      question,
      models,
      responses: models.reduce((acc, model) => {
        acc[model] = { answer: null, token_usage: {} };
        return acc;
      }, {}),
      order: req.orderQuestion + 1,
    };

    const messageDetails = new messageModel(details);
    await messageDetails.save();
    await chatModel.findByIdAndUpdate(chatId, {
      $push: { messages: messageDetails._id },
    });

    const json = {
      question,
      userId,
      chatId,
      messageId: messageDetails?._id,
      context: null,
      models,
    };

    // calling ai api without waiting
    axiosService.fetchPost("/chat", json);

    logger.info(
      "controller - chat - message.controller - newQuestionController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "Success new question is created",
      data: messageDetails,
      otherData: { pollingId: messageDetails?._id },
    });
  } catch (error) {
    logger.error(
      "controller - chat - message.controller - newQuestionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// call-back message answer for ai-server
const callBackMessageResponseController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - messsage.controller - callBackMessageResponseController - start"
    );

    const { token_usage, answer, messageId, model } = req.body;
    console.log("Answer :-", model, answer);

    const messageExist = await messageModel.findById(messageId);

    if (!messageExist) {
      return next(httpErrors.BadRequest("message not found"));
    }

    messageExist.responses[model] = {
      answer,
      token_usage,
    };

    await messageExist.save();

    logger.info(
      "controller - chat - messsage.controller - callBackMessageResponseController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "ok",
    });
  } catch (error) {
    logger.error(
      "controller - chat - message.controller - callBackMessageResponseController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// call-back summary for ai-server
const callBackSummaryResponseController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - messsage.controller - callBackSummaryResponseController - start"
    );
    const { question, token_usage, model, chatId } = req.body;
    console.log("Summary :-", model, answer);
    const key = `summaries.${model}`;
    const summaryExist = await summaryModel.findOneAndUpdate(
      { chat: chatId },
      { $set: { [key]: { question, token_usage } } }
    );

    if (!summaryExist) {
      return next(httpErrors.BadRequest("summary not found"));
    }

    logger.info(
      "controller - chat - messsage.controller - callBackSummaryResponseController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "ok",
    });
  } catch (error) {
    logger.error(
      "controller - chat - message.controller - callBackSummaryResponseController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// polling
const pollingAnswerController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - messsage.controller - pollingAnswerController - start"
    );
    // const { messageId } = req.params;
    const { userId, messageId } = req.query;
    const messsageExist = await messageModel
      .findOne({ _id: messageId, user: userId })
      .lean();
    if (!messsageExist) {
      return next(httpErrors.BadRequest("message details not exist"));
    }

    logger.info(
      "controller - chat - messsage.controller - pollingAnswerController - end"
    );

    let isRecievedAllResponses = messsageExist?.models?.map((item) =>
      messsageExist?.responses?.[item]?.answer ? true : false
    );

    isRecievedAllResponses = isRecievedAllResponses.every((item) => item);

    responseHandlerUtil.successResponseStandard(res, {
      message: "ok",
      data: messsageExist,
      otherData: { isRecievedAllResponses },
    });
  } catch (error) {
    logger.error(
      "controller - chat - message.controller - pollingAnswerController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  newQuestionController,
  callBackMessageResponseController,
  callBackSummaryResponseController,
  pollingAnswerController,
};
