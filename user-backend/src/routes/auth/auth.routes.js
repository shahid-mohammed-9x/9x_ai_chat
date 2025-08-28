const express = require("express");
const {
  checkUserController,
} = require("../../controllers/auth/auth.controller");
const {
  checkUserValidation,
} = require("../../validators/auth/auth.validation");

const AuthRoutes = express.Router();

AuthRoutes.route("/check-user").post(checkUserValidation, checkUserController);

module.exports = AuthRoutes;
