const express = require("express");
const AuthRoutes = require("./auth/auth.routes");
const OtpRoutes = require("./auth/otp.routes");
const UserRoutes = require("./user/user.routes");

// Route config
const ApiV1Routes = express.Router();

// ----------------------------------------
//  Auth  routes
// ----------------------------------------
ApiV1Routes.use("/auth", AuthRoutes);
ApiV1Routes.use("/auth/otp", OtpRoutes);

// ----------------------------------------
//  User  routes
// ----------------------------------------
ApiV1Routes.use("/user", UserRoutes);

// export the routes
module.exports = ApiV1Routes;
