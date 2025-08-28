const express = require("express");
const {
  myProfileController,
  loginUserController,
  loginUserExistController,
} = require("../../controllers/user/user.controller");
const {
  loginUserValidation,
} = require("../../validators/user/user.validation");
const { Authentication } = require("../../middlewares/auth.middleware");

const UserRoutes = express.Router();

UserRoutes.route("/my-profile").get(Authentication, myProfileController);

UserRoutes.route("/username-exist").post(
  loginUserValidation,
  loginUserExistController
);
module.exports = UserRoutes;
