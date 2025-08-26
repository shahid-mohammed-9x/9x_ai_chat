const mongoose = require("mongoose");
const { DEVELOPMENT_MODE, PRODUCTION_MONGODB_URL, DEVELOPMENT_MONGODB_URL } = require("./index.config");


// TODO : function for database connection
const MongoDataBaseConn = async () => {
  try {
    await mongoose.connect(
      DEVELOPMENT_MODE === "production"
        ? PRODUCTION_MONGODB_URL
        : DEVELOPMENT_MONGODB_URL,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log(DEVELOPMENT_MODE + " database is connected");
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      console.error("CastError:", error.value, error.path);
      // throw error;
    } else if (error.name === "MongoServerError" && error.code === 8000) {
      console.error("MongoServerError (Authentication): Check credentials.");
      // throw error; // Re-throw the authentication error
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      console.error(
        "MongoServerError (Duplicate Key): A document with that value already exists."
      );
      // throw error; // Re-throw the duplicate key error
    } else if (
      error.name === "MongoNetworkError" ||
      error.message.includes("timed out")
    ) {
      console.error(
        "MongoNetworkError or Timeout: Network connectivity issue."
      );
      // throw error; // Re-throw the network error
    } else if (
      error.name === "MongooseServerSelectionError" ||
      error.message.includes("Server selection timed out")
    ) {
      console.error(
        "MongooseServerSelectionError: Could not connect to the MongoDB server."
      );
      // throw error; // Re-throw the server selection error
    } else {
      console.error("Other MongoDB connection error:", error);
      // throw error; // Re-throw other errors
    }
  }
};

module.exports = MongoDataBaseConn;