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
        enum: ["gpt", "gemini"],
      },
    ],
    responses: {
      gpt: {
        answer: {
          type: String,
        },
        inputTokens: {
          type: Number,
        },
        outputTokens: {
          type: Number,
        },
      },
      gemini: {
        answer: {
          type: String,
        },
        inputTokens: {
          type: Number,
        },
        outputTokens: {
          type: Number,
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
