const mongoose = require("mongoose");
const conn = require('../../config');

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: [true, "Admin name is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
