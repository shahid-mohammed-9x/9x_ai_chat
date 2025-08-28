const express = require("express");

const { Authentication } = require("../../middlewares/auth.middleware");
const {
  createChatController,
} = require("../../controllers/chat/chat.controller");
const {
  createChatValidation,
} = require("../../validators/chat/chat.validation");

const ChatRoutes = express.Router();

ChatRoutes.route("/new-chat").post(createChatValidation, createChatController);

module.exports = ChatRoutes;
