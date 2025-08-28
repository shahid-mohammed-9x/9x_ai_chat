const express = require("express");

const { Authentication } = require("../../middlewares/auth.middleware");
const {
  createChatController,
} = require("../../controllers/chat/chat.controller");

const UserRoutes = express.Router();

UserRoutes.route("/new-chat").get(createChatController);

module.exports = UserRoutes;
