const mongoose = require("mongoose");
const { user, chat, summary } = require("../constants/model.constants");

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
    summaries: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const summaryModel = mongoose.model(summary, ModelSchema);

module.exports = summaryModel;
