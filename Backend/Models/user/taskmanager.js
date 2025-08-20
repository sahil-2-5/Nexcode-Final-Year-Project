const mongoose = require("mongoose");
const conn = require('../../config');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required."],
  },
  description: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required."],
  },
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
