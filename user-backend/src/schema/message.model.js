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
    responses: [
      {
        model: {
          type: String,
          enum: ["gpt", "claude", "gemini", "deepseek", "grok"],
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model(message, ModelSchema);

module.exports = messageModel;
