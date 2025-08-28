const httpErrors = require("http-errors");
// model
const userModel = require("../../schema/user.model");
const otpModel = require("../../schema/otp.model");
// config
const logger = require("../../config/logger.config");
// utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { generateOTP } = require("../../utils/otpGenerator.util");
const { createAccessToken } = require("../../utils/jwtToken.util");
const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");

// check user controller
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

// send email otp controller
const sendEmailOTPController = async (req, res, next) => {
  try {
    logger.info(
      "controller - auth - auth.controller - sendEmailOTPController - start"
    );

    const { email } = req.body;

    const userExist = await userModel
      .findOne({
        email,
      })
      .lean();

    if (userExist && userExist?.isActive)
      return next(httpErrors.Conflict("User already exists"));

    const isOtpExist = await otpModel
      .findOne({
        email,
      })
      .lean();
    let otpDetails = null;

    if (isOtpExist && isOtpExist.count >= 3) {
      if (!isOtpExist?.limitCompleted) {
        await otpModel.findByIdAndUpdate(isOtpExist._id, {
          limitCompleted: true,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours
        });
      }

      return next(
        httpErrors.TooManyRequests(
          "Too many attempts. Please try again after 24 hours."
        )
      );
    } else if (isOtpExist) {
      const otp = generateOTP();
      otpDetails = await otpModel.findByIdAndUpdate(
        isOtpExist._id,
        {
          otp,
          $inc: { count: 1 },
          verifyAttempts: 0,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
        { new: true }
      );
    } else {
      const otp = generateOTP();
      let userDetails = null;

      if (!userExist) {
        const userName = email.split("@")[0];
        userDetails = new userModel({
          email,
          userName,
        });

        await userDetails.save();
      }

      otpDetails = new otpModel({
        email,
        otp,
        user: userDetails?._id || userExist?._id,
      });
      await otpDetails.save();
    }

    // const awsMailServiceClass = new AwsMailServiceClass();
    // let mailDetails = {
    //   user_name: otpDetails.name,
    //   user_email: otpDetails.email,
    // };

    // sending mail using aws
    // await awsMailServiceClass.sendEmail(
    //   otpDetails.email,
    //   "welcomeRegistrationTemplate",
    //   null,
    //   mailDetails
    // );

    logger.info(
      "controller - auth - auth.controller - sendEmailOTPController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "otp send successfully on the given mail",
    });
  } catch (error) {
    logger.error(
      "controller - auth - auth.controller - sendEmailOTPController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// verify otp controller
const verifyOTPController = async (req, res, next) => {
  try {
    logger.info(
      "controller - auth - auth.controller - verifyOTPController - start"
    );

    const { otp, email } = req.body;

    const isOtpExist = await otpModel.findOne({ email }).lean();

    if (!isOtpExist || isOtpExist.expiresAt < new Date())
      return next(
        httpErrors.NotFound("OTP has expired. Please request a new one.")
      );

    if (isOtpExist.limitCompleted) {
      return next(
        httpErrors.TooManyRequests(
          "Too many attempts. Please try again after 24 hours."
        )
      );
    }

    if (isOtpExist.verifyAttempts >= 3) {
      return next(
        httpErrors.TooManyRequests(
          "Maximum OTP verification attempts exceeded. request a new otp"
        )
      );
    }

    // Check if OTP matches
    if (isOtpExist.otp !== otp) {
      await otpModel.findByIdAndUpdate(isOtpExist._id, {
        $inc: { verifyAttempts: 1 },
      });
      return next(httpErrors.BadRequest("Invalid OTP."));
    }

    await otpModel.findByIdAndDelete(isOtpExist._id);
    const token = await createAccessToken(isOtpExist.user, "user");
    const details = await userModel.findByIdAndUpdate(
      isOtpExist?.user,
      {
        isEmailVerified: true,
        isActive: true,
        token,
      },
      { new: true }
    );

    logger.info(
      "controller - auth - auth.controller - verifyOTPController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "OTP verified successfully.",
      data: details,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "controller - auth - auth.controller - verifyOTPController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const loginController = async (req, res, next) => {
  try {
    logger.info(
      "controller - auth - auth.controller - loginController - start"
    );

    const { userInput, password } = req.body;

    const userDetails = await userModel
      .findOne({
        $or: [{ email: userInput }, { userName: userInput }],
      })
      .select("+password");

    if (!userDetails) return next(httpErrors.NotFound("Invalid credentials."));

    const isPasswordMatch = await verifyPasswordMethod(
      password,
      userDetails.password
    );

    if (!isPasswordMatch)
      return next(httpErrors.Unauthorized("Invalid credentials."));

    const token = await createAccessToken(userDetails._id.toString(), "user");

    userDetails.token = token;
    await userDetails.save();

    const userDetailsObj = userDetails.toObject();
    delete userDetailsObj.password;
    delete userDetailsObj.token;

    logger.info("controller - auth - auth.controller - loginController - end");

    responseHandlerUtil.successResponseStandard(res, {
      message: "Login successful.",
      data: userDetailsObj,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "controller - auth - auth.controller - loginController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  checkUserController,
  sendEmailOTPController,
  verifyOTPController,
  loginController,
};
