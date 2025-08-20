const mongoose = require("mongoose");
const conn = require('../../config');

const avatarSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: true,
      unique: true, 
    },
    url: {
      type: String,
      required: true, 
    },
    width: {
      type: Number,
      required: false, 
    },
    height: {
      type: Number,
      required: false, 
    },
    format: {
      type: String,
      required: false,
    },
    uploadedAt: {
      type: Date,
      required: true,
      default: Date.now, 
    },
    tags: {
      type: [String],
      default: [], 
    },
    description: {
      type: String,
      default: "", 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Avatar", avatarSchema);
