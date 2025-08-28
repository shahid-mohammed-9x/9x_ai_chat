const express = require("express");

const {
  Authentication,
  AnonymousAuthentication,
} = require("../../middlewares/auth.middleware");
const {
  createChatController,
  chatsListController,
} = require("../../controllers/chat/chat.controller");
const {
  createChatValidation,
  chatsListValidation,
} = require("../../validators/chat/chat.validation");

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

module.exports = ChatRoutes;
