const express = require("express");
const UserRoutes = require("./users/user.routes");
const OtpRoutes = require("./users/otp.routes");

// Route config
const ApiV1Routes = express.Router();

// ----------------------------------------
//  user  routes
// ----------------------------------------
ApiV1Routes.use("/user", UserRoutes);
ApiV1Routes.use("/user/otp", OtpRoutes);

// export the routes
module.exports = ApiV1Routes;
