const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { user } = require("../constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      minimum: 8,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
      select: false,
    },
  },
  { timestamps: true }
);

ModelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const userModel = mongoose.model(user, ModelSchema);

module.exports = userModel;
