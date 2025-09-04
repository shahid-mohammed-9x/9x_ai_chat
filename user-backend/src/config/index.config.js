const dotenv = require("dotenv");
//   env load
dotenv.config();

module.exports = {
  SERVER_PORT: process.env.PORT || 8001,
  DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE || "development",
  DEVELOPMENT_ACCESS_USER_TOKEN:
    process.env.DEVELOPMENT_ACCESS_USER_TOKEN || null,

  // mongodb
  DEVELOPMENT_MONGODB_URL: process.env.DB_URL_DEV,
  PRODUCTION_MONGODB_URL: process.env.DB_URL,

  // token keys
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_TIME: process.env.ACCESS_TOKEN_KEY_TIME,

  // cors
  CORS_ALLOW_ORIGINS: process.env.ALLOW_ORIGINS_ACCESS || "[]",

  // ai server configs
  AI_API_URL: process.env.AI_API_URL || "http://10.10.1.65:8000",

  // nodemailer SMPT
 NODEMAILER_HOST: process.env.SMPT_HOST,
 NODEMAILER_PORT: process.env.SMPT_PORT,
 NODEMAILER_PASS: process.env.SMPT_PASS,
 NODEMAILER_USER: process.env.SMPT_USER,
 NODEMAILER_EMAIL: process.env.SMPT_EMAIL


};
