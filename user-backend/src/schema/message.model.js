const mongoose = require("mongoose");
const { user, chat, message } = require("../constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      default: null,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: chat,
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    models: [
      {
        type: String,
        enum: ["gpt", "gemini", "deepseek", "groq", "claude"],
      },
    ],
    responses: {
      gpt: {
        answer: {
          type: String,
        },
        token_usage: {
          type: Object,
        },
      },
      gemini: {
        answer: {
          type: String,
        },
        token_usage: {
          type: Object,
        },
      },
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model(message, ModelSchema);

module.exports = messageModel;
