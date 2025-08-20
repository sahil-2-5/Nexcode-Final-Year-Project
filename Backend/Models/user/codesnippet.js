const mongoose = require("mongoose");

const codeSnippetSchema = new mongoose.Schema(
  {
    codeSnippet: {
      type: String,
      required: [true, "Code snippet is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    language: {
      type: String,
      required: [true, "Programming language is required."],
      enum: ["JavaScript", "Python", "Java", "C++", "C#", "Go" , "C"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User schema
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodeSnippet", codeSnippetSchema);
