const mongoose = require("mongoose");
const conn = require('../../config');

const postSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: false,
      unique: true,
    },
    url: {
      type: String,
      default: null, // For text-based posts, URL will be null
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      default: null, // For text posts (tweets)
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
