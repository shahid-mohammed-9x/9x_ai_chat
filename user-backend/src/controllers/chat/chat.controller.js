const httpErrors = require("http-errors");
// models
const chatModel = require("../../schema/chat.model");
const messageModel = require("../../schema/message.model");
// config
const logger = require("../../config/logger.config");
// utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { user, chat } = require("../../constants/model.constants");

// create chat controller
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

    // calling an api of ai chat here

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

// user chat list controller
const chatsListController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - chat.controller - chatsListController - start"
    );
    const userId = req.user?._id;

    let { limit = 15, page = 1, sort = "-createdAt" } = req.query;
    limit = Number(limit);
    page = Number(page);

    const skip_docs = (page - 1) * limit;
    const query = { isAnonymous: false, user: userId };

    const totalDocs = await chatModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = await chatModel
      .find(query)
      .skip(skip_docs)
      .limit(limit)
      .sort(sort);

    const hasNext = totalDocs > skip_docs + limit;
    const hasPrev = page > 1;

    const data = {
      totalDocs,
      totalPages,
      docs,
      currentPage: page,
      hasNext,
      hasPrev,
      limit,
    };

    responseHandlerUtil.successResponseStandard(res, {
      message: "Successfully fetched chat list",
      data,
    });
    logger.info(
      "controller - chat - chat.controller - chatsListController - end"
    );
  } catch (error) {
    logger.error(
      "controller - chat - chat.controller - chatsListController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createChatController,
  chatsListController,
};
