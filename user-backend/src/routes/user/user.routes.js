const express = require("express");
const {
  myProfileController,
  setPasswordController,
} = require("../../controllers/user/user.controller");

const { Authentication } = require("../../middlewares/auth.middleware");
const {
  setPasswordValidation,
} = require("../../validators/user/user.validation");

const UserRoutes = express.Router();

UserRoutes.route("/my-profile").get(Authentication, myProfileController);

UserRoutes.route("/set-password").post(
  Authentication,
  setPasswordValidation,
  setPasswordController
);

module.exports = UserRoutes;
