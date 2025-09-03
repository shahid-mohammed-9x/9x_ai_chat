const express = require("express");
const {
  checkUserController,
  sendEmailOTPController,
  verifyOTPController,
  loginController,
} = require("../../controllers/auth/auth.controller");
const {
  checkUserValidation,
  sendEmailOTPValidation,
  verifyOTPValidation,
  loginValidation,
} = require("../../validators/auth/auth.validation");

const AuthRoutes = express.Router();

AuthRoutes.route("/check-user").post(checkUserValidation, checkUserController);

AuthRoutes.route("/send-otp").post(
  sendEmailOTPValidation,
  sendEmailOTPController
);


AuthRoutes.route("/verify-otp").post(verifyOTPValidation, verifyOTPController);

AuthRoutes.route("/login").post(loginValidation, loginController);


// login with google
// AuthRoutes.route('/google/callback');
// AuthRoutes.route('/google')

module.exports = AuthRoutes;
