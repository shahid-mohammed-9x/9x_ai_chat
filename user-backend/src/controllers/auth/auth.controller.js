const userModel = require("../../schema/user.model");
const logger = require("../../config/logger.config");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");

const checkUserController = async (req, res, next) => {
  try {
    logger.info(
      "controller - auth - auth.controller - checkUserController - start"
    );

    const { userInput } = req.body;
    const userExist = await userModel
      .findOne({
        $or: [{ email: userInput }, { userName: userInput }],
      })
      .select("+password")
      .lean();

    logger.info(
      "controller - auth - auth.controller - checkUserController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      success: !!userExist,
      statusCode: 200,
      message: userExist ? "User is exist" : "User is not exist",
      data: {
        userExists: !!userExist,
        isPasswordSet: userExist?.password ? true : false,
      },
    });
  } catch (error) {
    logger.error(
      "controller - auth - auth.controller - checkUserController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  checkUserController,
};
