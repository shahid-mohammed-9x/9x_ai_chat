const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const logger = require("../../config/logger.config");
const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");
const { createAccessToken } = require("../../utils/jwtToken.util");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { rolesConstants } = require("../../constants/index.constants");
const USER_CONSTANTS = require("../../constants/user.constants");

const registerUserController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - registerUserController - start"
    );

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      phoneNumber,
    } = req.body;

    // if passwords or not same
    if (password !== confirmPassword)
      return next(httpErrors.BadRequest(USER_CONSTANTS.CONFIRM_PASSWORD_SAME));

    let userExist = await userModel.findOne({ email });

    // if user exists
    if (userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.USER_ALREADY_EXISTS));

    const newUserDetails = new userModel({
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
    });

    const token = await createAccessToken(
      newUserDetails?._id.toString(),
      newUserDetails.role
    );

    newUserDetails.token = token;
    await newUserDetails.save();

    const leanUserDetails = newUserDetails.toObject();
    delete leanUserDetails.password;
    delete leanUserDetails.token;

    logger.info(
      "controller - users - user.controller - registerUserController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      success: true,
      statusCode: 201,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_CREATED,
      data: leanUserDetails,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "controller - users - user.controller - registerUserController - error",
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

const loginUserController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - loginUserController - start"
    );

    const { email, password } = req.body;

    let userExist = await userModel
      .findOne({ email, role: rolesConstants.USER })
      .select("+password");

    // if user exists
    if (!userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    const isPasspwordMatch = await verifyPasswordMethod(
      password,
      userExist.password
    );
    if (!isPasspwordMatch)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    const token = await createAccessToken(
      userExist?._id.toString(),
      userExist.role
    );

    userExist.token = token;
    await userExist.save();

    const leanUserDetails = userExist.toObject();
    delete leanUserDetails.password;
    delete leanUserDetails.token;

    logger.info(
      "controller - users - user.controller - loginUserController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: USER_CONSTANTS.SUCCESSFULLY_USER_LOGIN,
      data: leanUserDetails,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "controller - users - user.controller - loginUserController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  registerUserController,
  myProfileController,
  loginUserController,
};
