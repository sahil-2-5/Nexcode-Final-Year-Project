const mongoose = require("mongoose");
const conn = require('../../config');

const aiToolSchema = new mongoose.Schema({
  iconUrl: {
    type: String,
    required: [true, "Icon URL is required."],
    unique: true, // Ensure uniqueness of the icon URL
  },
  toolName: {
    type: String,
    required: [true, "Tool name is required."],
    unique: true, // Ensure tool names are unique
  },
  category: {
    type: String,
    required: [true, "Category is required."],
    message: "Please select a valid category.",
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  visitLink: {
    type: String,
    required: [true, "Visit link is required."],
  },
}, { timestamps: true });

module.exports = mongoose.model("AITool", aiToolSchema);