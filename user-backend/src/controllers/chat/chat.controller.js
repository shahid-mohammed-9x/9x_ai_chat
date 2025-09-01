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
      models,
      responses: models.reduce((acc, model) => {
        acc[model] = {
          answer: null,
          token_usage: {
            input_tokens: 0,
            output_tokens: 0,
          },
        };
        return acc;
      }, {}),
      order: 0,
    };

    const newChatDetails = {
      title: question.substring(0, 50),
      isAnonymous: !userId,
    };

    const newMessage = new messageModel(newMessageDetails);
    const newChat = new chatModel(newChatDetails);

    newMessage.chat = newChat._id;
    newChat.messages.push(newMessage._id);
    userId && (newChat.user = userId);

    await newMessage.save();
    await newChat.save();

    const json = {
      question,
      userId,
      chatId: newChat._id,
      messageId: newMessage?._id,
      context: null,
      models: ["gemini"],
    };

    // calling ai api without waiting
    axiosService.fetchPost("/chat", json);

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
      .select("title models createdAt")
      .sort(sortConstants[sort] || sortConstants["-createdAt"]);

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
    logger.info(
      "controller - chat - chat.controller - chatsListController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "Successfully fetched chat list",
      data,
    });
  } catch (error) {
    logger.error(
      "controller - chat - chat.controller - chatsListController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// user message list controller
const messageListController = async (req, res, next) => {
  try {
    logger.info(
      "controller - chat - chat.controller - messageListController - start"
    );

    const userId = req.user?._id;
    const { chatId } = req.params;
    const isChatExist = await chatModel.findOne({ _id: chatId, user: userId });

    if (!isChatExist) {
      return next(httpErrors.NotFound("Chat not found"));
    }

    let { limit = 15, page = 1, sort = "-createdAt" } = req.query;
    limit = Number(limit);
    page = Number(page);

    const skip_docs = (page - 1) * limit;
    const query = { chat: chatId, user: userId };

    const totalDocs = await messageModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = await messageModel
      .find(query)
      .skip(skip_docs)
      .limit(limit)
      .select("responses question models order")
      .sort(sortConstants[sort] || sortConstants["-createdAt"]);

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
      chatDetails: isChatExist,
    };

    logger.info(
      "controller - chat - chat.controller - messageListController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "Successfully fetched message list",
      data,
    });
  } catch (error) {
    logger.error(
      "controller - chat - chat.controller - messageListController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createChatController,
  chatsListController,
  messageListController,
};
