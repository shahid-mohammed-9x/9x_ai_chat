const mongoose = require("mongoose");
const { user, otp } = require("../constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    count: {
      // for resending
      type: Number,
      default: 1,
    },
    verifyAttempts: {
      type: Number,
      default: 1,
    },
    limitCompleted: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000), //5 minutes
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

const otpModel = mongoose.model(otp, ModelSchema);

module.exports = otpModel;
