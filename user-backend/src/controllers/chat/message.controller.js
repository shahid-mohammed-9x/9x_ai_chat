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
const summaryModel = require("../../schema/summary.model");

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
      user: userId,
      chat: chatId,
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

    const summaryData = await summaryModel.findOne({ chat: chatId });

    const context = models?.map((model) => ({
      model: summaryData?.summaries?.[model]?.summary || null,
    }));

    const json = {
      question,
      userId,
      chatId,
      messageId: messageDetails?._id,
      context,
      models: ["gemini"],
    };

    // calling ai api without waiting
    axiosService.fetchPost("/chat", json);

    logger.info(
      "controller - chat - message.controller - newQuestionController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "Success new question is created",
      // data: response,
    });
  } catch (error) {
    logger.error(
      "controller - chat - message.controller - newQuestionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const callBackMessageResponseController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - messsage.controller - callBackMessageResponseController - start"
    );

    const { token_usage, answer, messageId, model } = req.body;

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

const callBackSummaryResponseController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - messsage.controller - callBackSummaryResponseController - start"
    );
    const { question, token_usage, model, chatId } = req.body;
    // console.log(req.body);
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

module.exports = {
  newQuestionController,
  callBackMessageResponseController,
  callBackSummaryResponseController,
};
