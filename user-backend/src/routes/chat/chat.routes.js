const express = require("express");

const {
  Authentication,
  AnonymousAuthentication,
} = require("../../middlewares/auth.middleware");
const {
  createChatController,
  chatsListController,
  messageListController,
} = require("../../controllers/chat/chat.controller");
const {
  createChatValidation,
  chatsListValidation,
  messageListValidation,
} = require("../../validators/chat/chat.validation");
const {
  newQuestionController,
  callBackMessageResponseController,
  callBackSummaryResponseController,
  pollingAnswerController,
} = require("../../controllers/chat/message.controller");
const {
  CheckUserChatMiddleWare,
} = require("../../middlewares/chat.middleware");

const ChatRoutes = express.Router();

ChatRoutes.route("/new-chat").post(
  AnonymousAuthentication,
  createChatValidation,
  createChatController
);

ChatRoutes.route("/user-chats").get(
  Authentication,
  chatsListValidation,
  chatsListController
);

ChatRoutes.route("/chat-messages/:chatId").get(
  Authentication,
  messageListValidation,
  messageListController
);

ChatRoutes.route("/:chatId/new-question").post(
  Authentication,
  CheckUserChatMiddleWare(false),
  newQuestionController
);

ChatRoutes.route("/callback/answer-response").post(
  callBackMessageResponseController
);

ChatRoutes.route("/callback/summary-response").post(
  callBackSummaryResponseController
);

ChatRoutes.route("/polling").get(pollingAnswerController);

module.exports = ChatRoutes;
