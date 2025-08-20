const mongoose = require("mongoose");
const conn = require('../../config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  fullName: {
    type: String,
    default: null,
  },
  profilePicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Avatar",
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  jobTitle: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "NexCodeOverFlow",
    default: [],
  },
  answers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "NexCodeOverFlow",
    default: [],
  },
  savedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  skills: {
    type: [String], 
    default: [],
  },
  dob: {
    type: String, 
    default: null,
  },
  contactNumber: {
    type: String,
    default: null,
  },
  workExperience: {
    type: Number, 
  },
  codeSnippets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "CodeSnippet",
    default: [],
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Task",
    default: [],
  },
  sharedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
