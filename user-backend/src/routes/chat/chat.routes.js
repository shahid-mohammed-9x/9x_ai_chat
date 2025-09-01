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
} = require("../../controllers/chat/message.controller");

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
  newQuestionController
);

module.exports = ChatRoutes;
