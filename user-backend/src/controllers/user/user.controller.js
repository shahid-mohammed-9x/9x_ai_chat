const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const logger = require("../../config/logger.config");
const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");
const { createAccessToken } = require("../../utils/jwtToken.util");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { rolesConstants } = require("../../constants/index.constants");
const USER_CONSTANTS = require("../../constants/user.constants");
const { user } = require("../../constants/model.constants");

const loginUserExistController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - loginUserExistController - start"
    );

    const { username } = req.body;
    const userExist = await userModel
      .findOne({
        $or: [{ email: username }, { username }],
      })
      .select("+password")
      .lean();

    logger.info(
      "controller - users - user.controller - loginUserExistController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      success: !!userExist,
      statusCode: 200,
      message: userExist ? "user exist" : "user not exist",
      data: {
        userExist: !!userExist,
        isPasswordSet: userExist?.password ? true : false,
      },
    });
  } catch (error) {
    logger.error(
      "controller - users - user.controller - loginUserExistController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

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

module.exports = {
  myProfileController,
  loginUserExistController,
};
