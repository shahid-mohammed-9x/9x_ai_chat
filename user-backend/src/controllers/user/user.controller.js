const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const logger = require("../../config/logger.config");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");

// my prfile controller
const myProfileController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - myProfileController - start"
    );
    const details = await userModel.findById(req.user._id).lean();

    logger.info(
      "controller - users - user.controller - myProfileController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully user details fetched",
      data: details,
    });
  } catch (error) {
    logger.error(
      "controller - users - user.controller - myProfileController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// set password controller
const setPasswordController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - setPasswordController - start"
    );
    const { password } = req.body;

    const isUserExist = await userModel
      .findById(req.user._id)
      .select("+password");

    if (isUserExist?.password)
      return next(httpErrors.BadRequest("Password already set"));

    isUserExist.password = password;
    await isUserExist.save();

    logger.info(
      "controller - users - user.controller - setPasswordController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully password set",
      data: null,
    });
  } catch (error) {
    logger.error(
      "controller - users - user.controller - setPasswordController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  myProfileController,
  setPasswordController,
};
