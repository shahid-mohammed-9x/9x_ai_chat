const express = require("express");
const {
  myProfileController,
} = require("../../controllers/user/user.controller");

const { Authentication } = require("../../middlewares/auth.middleware");

const UserRoutes = express.Router();

UserRoutes.route("/my-profile").get(Authentication, myProfileController);

module.exports = UserRoutes;
