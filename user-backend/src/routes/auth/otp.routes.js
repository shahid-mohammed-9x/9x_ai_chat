const express = require("express");
const {
  verifyRegisterUserOTPValidation,
} = require("../../validators/auth/otp.validation");
const { Authentication } = require("../../middlewares/auth.middleware");
const {
  sendRegisterUserEmailOTPController,
  verifyRegisterUserEmailOTPController,
} = require("../../controllers/auth/otpVerification.controller");

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
