const { DEVELOPMENT_MODE } = require("../../config/index.config");
const logger = require("../../config/logger.config");
const userModel = require("../../schema/user.model");
const GoogleAuthServiceClass = require("../../services/google.auth.service");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");

const loginWithGoogleController = (req, res, next)=>{
    try{
        logger.info(
            "controller - auth - google.controller - loginWithGoogleController - start"
        );

        const googleAuthService = new GoogleAuthServiceClass();

        const authUrl = googleAuthService.generateAuthUrl();

        logger.info(
            "controller - auth - google.controller - loginWithGoogleController - end"
        );

        res.redirect(authUrl)
    }
    catch(error){
        logger.info(
            "controller - auth - google.controller - loginWithGoogleController - error"
        );
        errorHandling.handleCustomErrorService(error, next);
    }
};

const googleAuthCallbackController = async(req, res, next) =>{
    try{
        logger.info(
            "controller - auth - google.controller - googleAuthCallbackController - start"
        );

        const {code} = req.query;

        if(!code) throw new Error("Authorization code not provides");

        const googleAuthService = new GoogleAuthServiceClass();

        const googleUser = await googleAuthService.getTokensFromCode(code);

        if(!googleUser){
            return next(httpErrors.BadRequest("Something Went wrong"));
        }
        console.log(googleUser)

        let newUser;
        const user = await userModel.findOne({email: googleUser?.email});
        if(!user){
            newUser = new userModel({
                email: googleUser?.email,
                userName: googleUser?.email.split('@')[0],
                fullName: googleUser?.name,
                isEmailVerified: googleUser?.verified_email,
            })

            await newUser.save();
        }

        console.log(newUser)

        let baseUrl = DEVELOPMENT_MODE == "development" ? "http://localhost:5173/new-chat" : ""

        logger.info(
            "controller - auth - google.controller - googleAuthCallbackController - end"
        );

        // responseHandlerUtil.successResponseStandard(res, {
        //     message: "successfully user LoggedIn",
        //     data: user,
        //     otherData: {
        //     baseUrl
        //     }
        // });
    }
    catch(error){
        logger.info(
            "controller - auth - google.controller - googleAuthCallbackController - error"
        );
        errorHandling.handleCustomErrorService(error, next);
    }

}

module.exports = {
    googleAuthCallbackController,
    loginWithGoogleController
}