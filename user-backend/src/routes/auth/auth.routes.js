const express = require("express");
const {
  loginUserExistController,
} = require("../../controllers/auth/auth.controller");
const {
  loginUserValidation,
} = require("../../validators/auth/auth.validation");

const AuthRoutes = express.Router();

AuthRoutes.route("/check-user").post(
  loginUserValidation,
  loginUserExistController
);

module.exports = AuthRoutes;
