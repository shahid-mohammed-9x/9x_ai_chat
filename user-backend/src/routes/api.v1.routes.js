const express = require("express");
const AuthRoutes = require("./auth/auth.routes");
const UserRoutes = require("./user/user.routes");
const ChatRoutes = require("./chat/chat.routes");

// Route config
const ApiV1Routes = express.Router();

// ----------------------------------------
//  Auth  routes
// ----------------------------------------
ApiV1Routes.use("/auth", AuthRoutes);

// ----------------------------------------
//  User  routes
// ----------------------------------------
ApiV1Routes.use("/user", UserRoutes);

// ----------------------------------------
//  Chat  routes
// ----------------------------------------
ApiV1Routes.use("/chat", ChatRoutes);

// export the routes
module.exports = ApiV1Routes;
