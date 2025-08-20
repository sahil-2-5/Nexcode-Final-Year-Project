const mongoose = require("mongoose");
const conn = require('../../config');

const nexCodeOverFlowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
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
    answers: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          username: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
          votes: {
           type:Number,
           default:0,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    votes: {
      type:Number,
      default:0
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["open", "closed", "resolved"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NexCodeOverFlow", nexCodeOverFlowSchema);
