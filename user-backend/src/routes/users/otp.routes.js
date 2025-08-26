const express = require("express");
const {
  verifyRegisterUserOTPValidation,
} = require("../../validators/user/user.validation");
const { Authentication } = require("../../middlewares/auth.middleware");
const {
  sendRegisterUserEmailOTPController,
  verifyRegisterUserEmailOTPController,
} = require("../../controllers/user/otpVerification.controller");

const OtpRoutes = express.Router();

OtpRoutes.route("/send-email").get(
  Authentication,
  sendRegisterUserEmailOTPController
);

OtpRoutes.route("/verify-email").post(
  Authentication,
  verifyRegisterUserOTPValidation,
  verifyRegisterUserEmailOTPController
);

module.exports = OtpRoutes;
