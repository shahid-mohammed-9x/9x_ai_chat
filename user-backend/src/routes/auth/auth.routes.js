const express = require("express");
const {
  checkUserController,
  sendEmailOTPController,
} = require("../../controllers/auth/auth.controller");
const {
  checkUserValidation,
  sendEmailOTPValidation,
} = require("../../validators/auth/auth.validation");

const AuthRoutes = express.Router();

AuthRoutes.route("/check-user").post(checkUserValidation, checkUserController);

AuthRoutes.route("/send-otp").post(
  sendEmailOTPValidation,
  sendEmailOTPController
);

module.exports = AuthRoutes;
