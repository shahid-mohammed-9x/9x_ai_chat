const express = require("express");
const {
  checkUserController,
  sendEmailOTPController,
  verifyOTPController,
} = require("../../controllers/auth/auth.controller");
const {
  checkUserValidation,
  sendEmailOTPValidation,
  verifyOTPValidation,
} = require("../../validators/auth/auth.validation");

const AuthRoutes = express.Router();

AuthRoutes.route("/check-user").post(checkUserValidation, checkUserController);

AuthRoutes.route("/send-otp").post(
  sendEmailOTPValidation,
  sendEmailOTPController
);

AuthRoutes.route("/verify-otp").post(verifyOTPValidation, verifyOTPController);

module.exports = AuthRoutes;
