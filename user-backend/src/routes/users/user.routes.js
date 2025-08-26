const express = require("express");
const {
  registerUserController,
  myProfileController,
  loginUserController,
} = require("../../controllers/user/user.controller");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../../validators/user/user.validation");
const { Authentication } = require("../../middlewares/auth.middleware");

const UserRoutes = express.Router();

UserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);

UserRoutes.route("/my-profile").get(Authentication, myProfileController);

UserRoutes.route("/login").post(loginUserValidation, loginUserController);
module.exports = UserRoutes;
