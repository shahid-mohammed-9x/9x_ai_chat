const httpErrors = require("http-errors");
// models
const userModel = require("../schema/user.model");
// utils
const { verifyAccessToken } = require("../utils/jwtToken.util");
const errorHandling = require("../utils/errorHandling.util");
// config
const {
  DEVELOPMENT_MODE,
  DEVELOPMENT_ACCESS_USER_TOKEN,
} = require("../config/index.config");
const logger = require("../config/logger.config");
// constants
const { USER_NOT_FOUND } = require("../constants/user.constants");
const {
  AUTHENTICATION_TOKEN_REQUIRED,
  AUTHORIZATION_REQUIRED,
} = require("../constants/auth.constants");

// authentication middleware
module.exports.Authentication = async (req, res, next) => {
  try {
    let authHeader = req.header("Authorization");
    if (DEVELOPMENT_MODE === "development" && req?.authToken) {
      authHeader = req.authToken;
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized(AUTHENTICATION_TOKEN_REQUIRED));
    }

    const token = authHeader.split(" ")[1];
    const decode = await verifyAccessToken(token);
    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    let userExist = await userModel.findById(decode.id).lean();

    if (!userExist) {
      return next(httpErrors.NotFound(USER_NOT_FOUND));
    }
    req.user = userExist;
    req.role = userExist?.role;
    logger.info(
      `req Email : ${userExist?.email || userExist?.lastName} role:${
        userExist.role
      }`
    );
    next();
  } catch (error) {
    errorHandling.handleCustomErrorService(error, next);
  }
};

// authorization depending  upon a role
module.exports.Authorization = (...roles) => {
  return (req, res, next) => {
    const userRole = req.role;
    if (!roles.includes(userRole)) {
      return next(httpErrors.Unauthorized(AUTHORIZATION_REQUIRED));
    }
    next();
  };
};

// user email verified middleware
module.exports.CheckUserVerified = (req, res, next) => {
  if (!req.user?.isEmailVerified)
    return next(httpErrors.Forbidden("User email is not verified"));
  else next();
};

// anonymous  authentication middleware
module.exports.AnonymousAuthentication = async (req, res, next) => {
  try {
    let authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized(AUTHENTICATION_TOKEN_REQUIRED));
    }

    const token = authHeader.split(" ")[1];

    if (token === "anonymous_token") {
      req.isAnonymous = true;
      return next();
    }

    const decode = await verifyAccessToken(token);
    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    let userExist = await userModel.findById(decode.id).lean();

    if (!userExist) {
      return next(httpErrors.NotFound(USER_NOT_FOUND));
    }
    req.user = userExist;
    req.role = userExist?.role;
    logger.info(
      `req Email : ${userExist?.email || userExist?.lastName} role:${
        userExist.role
      }`
    );
    next();
  } catch (error) {
    errorHandling.handleCustomErrorService(error, next);
  }
};

// setting headers for the development purpose
module.exports.setHeaderDevelopment = (req, res, next) => {
  let token = DEVELOPMENT_ACCESS_USER_TOKEN;
  req.authToken = token;
  next();
};
