const { google } = require("googleapis");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = require("../config/index.config");
const logger = require("../config/logger.config");
const { createAccessToken } = require("../utils/jwtToken.util");
const userModel = require("../schema/user.model");

const scopes = ["email", "profile"];

class GoogleAuthServiceClass {
  constructor() {
    this.OAuth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );
  }

  generateAuthUrl() {
    logger.info(
      "Services - google.auth.services - GoogleAuthServicesClass - generateAuthUrl"
    );

    return this.OAuth2Client.generateAuthUrl({
      access_type: "offline", // Ensures refresh_token is returned on first consent
      prompt: "consent", // Always show the consent screen
      scope: scopes,
    });
  }

  async getUsersDetails() {
    logger.info(
      "Services - google.auth.services - GoogleAuthServicesClass - getUserDetails"
    );
    const oauth2 = google.oauth2({
      auth: this.OAuth2Client,
      version: "v2",
    });
    const { data } = await oauth2.userinfo.get();
    if (!data) {
      return;
    }
    return data;
  }

  async getTokensFromCode(code) {
    try {
      logger.info(
        "Services - google.auth.service - GoogleAuthServicesClass - getTokensFromCode - start"
      );

      const { tokens } = await this.OAuth2Client.getToken(code);
      this.OAuth2Client.setCredentials(tokens);

      const user = this.getUsersDetails();

      logger.info(
        "Services - google.auth.service - GoogleAuthServicesClass - getTokensFromCode - end"
      );
      return user;
    } catch (error) {
      logger.error(
        "Services - google.auth.service - GoogleAuthServicesClass - getTokensFromCode - error"
      );
      throw error;
    }
  }

  setCredentials(tokens) {
    this.OAuth2Client.setCredentials(tokens);
  }
}

module.exports = GoogleAuthServiceClass;
