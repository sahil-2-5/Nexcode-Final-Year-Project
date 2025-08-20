const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const usermodel = require("../../Models/user/user");
const overflowmodel = require("../../Models/user/nexcodeoverflow");
const userprofilemodel = require("../../Models/user/avtar");
const codesnippet = require("../../Models/user/codesnippet");
const Taskmodel = require("../../Models/user/taskmanager");
const postmodel = require("../../Models/user/post");
const aimodel = require("../../Models/admin/aitool");
const otpmodel = require("../../Models/admin/otp");

const upload = require("../../utils/upload");
const sendOTPEmail = require("../../utils/sendEmail");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const user = require("../../Models/user/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userSignup = async (req, res) => {
  let { fullName, username, contactNumber, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await usermodel.create({
        fullName,
        username,
        contactNumber,
        email,
        password: hash,
      });
      let token = jwt.sign(
        { email: email, userid: user._id },
        process.env.USER_S_KEY
      );
      await user.save();
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 36000,
        secure: false,
      });
      res.json({ status: true, message: "user registerd..", user });
    });
  });
};

const userLogin = async (req, res) => {
  let { email, password } = req.body;

  const user = await usermodel.findOne({ email });
  if (!user) return res.status(500).send("something is wrong");

  bcrypt.compare(password, user.password, async (err, result) => {
    if (result) {
      let token = jwt.sign({ id: user._id }, process.env.USER_S_KEY, {
        expiresIn: "7d",
      });
      req.session.user = { email, userId: user._id };
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 36000,
        secure: false,
      });
      await user.save();
      const authHeader = `Bearer ${token}`;
      res.setHeader("Authorization", authHeader);
      return res.json({ status: true, message: "login successfully", token });
    } else {
      res.send("wrong password");
    }
  });
};

const getUser = async (req, res) => {
  try {
    const user = await usermodel
      .findById(req.user.id)
      .populate({ path: "profilePicture", select: "url" });
    if (!user.profilePicture) {
      const avatar = await userprofilemodel
        .findOne({ user: req.user.id })
        .select("url");
      if (avatar) {
        user.profilePicture = avatar;
      }
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const checkSession = (req, res) => {
  if (req.session.user) {
    return res.json({
      status: true,
      user: req.session.user,
      message: "User is logged in",
    });
  } else {
    return res.status(401).json({ status: false, message: "Not logged in" });
  }
};

const storeQuestion = async (req, res) => {
  try {
    let { title, description, tags, data } = req.body;

    if (!data) {
      return res
        .status(400)
        .json({ status: false, message: "User ID is required." });
    }

    const question = await overflowmodel.create({
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      user: data,
    });

    await usermodel.findByIdAndUpdate(
      data,
      { $push: { questions: question._id } },
      { new: true, useFindAndModify: false }
    );

    res.json({ status: true, message: "Question Added", question });
  } catch (error) {
    console.error("Error storing question:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const allQuestion = async (req, res) => {
  try {
    const question = await overflowmodel
      .find()
      .populate({
        path: "user",
        select: "username email profilePicture",
        populate: {
          path: "profilePicture",
          select: "url",
        },
      })
      .sort({ createdAt: -1 });
    res.json(question);
  } catch (e) {
    console.log("Question Not Found");
  }
};

const storeAnswer = async (req, res) => {
  try {
    let { answer, userid, username, questionid } = req.body;

    if (!answer || !userid || !username || !questionid) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }

    const ans = await overflowmodel.findByIdAndUpdate(
      questionid,
      {
        $push: {
          answers: {
            user: userid,
            username: username,
            answer: answer,
            votes: 0,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!ans) {
      return res
        .status(404)
        .json({ status: false, message: "Question not found." });
    }

    await usermodel.findByIdAndUpdate(
      userid,
      { $push: { answers: questionid } },
      { new: true, useFindAndModify: false }
    );

    res.json({ status: true, message: "New Answer Added.", ans });
  } catch (error) {
    console.error("Error storing answer:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getAnswer = async (req, res) => {
  try {
    let questionid = req.params;

    const question = await overflowmodel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(questionid) } },
      { $unwind: "$answers" },
      {
        $lookup: {
          from: "users",
          localField: "answers.user",
          foreignField: "_id",
          as: "userProfile",
        },
      },
      {
        $lookup: {
          from: "avatars",
          localField: "userProfile.profilePicture",
          foreignField: "_id",
          as: "profileImage",
        },
      },
      {
        $project: {
          _id: 0,
          "answers._id": 1,
          "answers.answer": 1,
          "answers.votes": 1,
          "answers.createdAt": 1,
          "answers.username": 1,
          "userProfile._id": 1,
          "userProfile.username": 1,
          "profileImage.url": 1,
        },
      },
    ]);

    if (!question || question.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Question not found" });
    }

    const formattedAnswers = question.map((q) => ({
      ...q,
      userProfile: q.userProfile.map((user) => ({
        ...user,
        profilePicture: user.profileImage?.[0]?.url || null,
      })),
    }));

    res.status(200).json({ status: true, answers: formattedAnswers });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const userProfile = async (req, res, next) => {
  try {
    const result = await upload(req.file);

    if (!result) {
      return res.status(400).json({ message: "Upload failed" });
    }

    const userId = req.user?._id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedProfile = await userprofilemodel.findOneAndUpdate(
      { user: userId },
      {
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        tags: req.body.tags || [],
        description: req.body.description || "",
      },
      { new: true, upsert: true }
    );

    await usermodel.findByIdAndUpdate(userId, {
      profilePicture: updatedProfile._id,
    });

    res.status(200).json({
      message: "Profile picture updated successfully",
      image: updatedProfile.url,
      post: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    let updateData = req.body;

    if (updateData.skills && typeof updateData.skills === "string") {
      updateData.skills = updateData.skills
        .split(",")
        .map((skill) => skill.trim());
    }

    const updatedUser = await user.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const users = await usermodel.find().populate("profilePicture", "url");
    res.json(users);
  } catch (e) {
    console.log("User Not Found");
  }
};

const addCodeSnippet = async (req, res) => {
  try {
    const { userid, code, description, language } = req.body;

    const newSnippet = new codesnippet({
      user: userid,
      codeSnippet: code,
      description,
      language,
    });

    await newSnippet.save();

    res.status(201).json({
      message: "Code snippet added successfully!",
      snippet: newSnippet,
    });
  } catch (error) {
    console.error("Error adding code snippet:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCodeSnippet = async (req, res) => {
  try {
    const code = await codesnippet.find().populate({
      path: "user",
      select: "username profilePicture",
      populate: {
        path: "profilePicture",
        select: "url",
      },
    });
    res.json(code);
  } catch (e) {
    console.log(e);
  }
};

const AddNewTask = async (req, res) => {
  try {
    const { userid, title, description, priority, date, tag } = req.body;
    const newTask = new Taskmodel({
      createdBy: userid,
      title,
      description,
      priority,
      dueDate: date,
      tags: tag,
    });
    await newTask.save();
    res.status(201).json({
      message: "New task added successfully!",
      newTask,
    });
  } catch (e) {
    console.log(e);
  }
};

const getTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.query;

    if (status === "completed") filter.isCompleted = true;
    if (status === "pending") filter.isCompleted = false;

    const tasks = await Taskmodel.find({ createdBy: userId }).sort({
      dueDate: 1,
    });
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this user." });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
};

const updateState = async (req, res) => {
  try {
    const taskId  = req.params.id;
    const status = req.body.status;

    if (!["Pending", "Completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedTask = await Taskmodel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Failed to update task status" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletetask = await Taskmodel.findByIdAndDelete(req.params.id);
    if (!deletetask) {
      return res.status(404).json({ msg: "Not Found" });
    }
    res.status(200).json({ msg: "Deleted!" });
  } catch (e) {
    res.status(500).json({ msg: "server error", e });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, priority, date } = req.body;

    const updatedTask = await Taskmodel.findOneAndUpdate(
      { _id: taskId },
      { title, description, priority, dueDate: date },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const uploadPost = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let uploadResult = null;
    if (req.file) {
      uploadResult = await upload(req.file);
    }

    let tags = req.body.hashtags;

    if (Array.isArray(tags)) {
      tags = tags.map((tag) => tag.trim()).filter((tag) => tag !== "");
    } else if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    } else {
      tags = [];
    }

    const newPost = new postmodel({
      user: userId,
      publicId: uploadResult ? uploadResult.public_id : null,
      url: uploadResult ? uploadResult.secure_url : null,
      width: uploadResult ? uploadResult.width : null,
      height: uploadResult ? uploadResult.height : null,
      format: uploadResult ? uploadResult.format : null,
      tags: tags,
      bio: req.body.bio || "",
    });

    const savedPost = await newPost.save();

    await usermodel.findByIdAndUpdate(
      userId,
      { $push: { sharedPosts: savedPost._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Post created successfully and added to shared posts",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await postmodel.find().populate({
      path: "user",
      select: "username",
      populate: {
        path: "profilePicture",
        select: "url",
      },
    });
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postmodel.findById(id).populate({
      path: "user",
      select: "username",
      populate: {
        path: "profilePicture",
        select: "url",
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel.findById(id)
    .populate({
      path: "profilePicture", 
      select: "url"
    })
    .populate({
      path: "sharedPosts", 
      select: "url likes comments"
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  const existingUser = await usermodel.findOne({ email });
  if (!existingUser) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await otpmodel.create({ email, otp });
  await sendOTPEmail(email, otp);

  res.json({ message: "OTP sent successfully" });
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const valid = await otpmodel.findOne({ email, otp });

  if (!valid) return res.status(400).json({ message: "Invalid or expired OTP" });

  await otpmodel.deleteOne({ _id: valid._id }); // cleanup after verification
  res.json({ message: "OTP verified" });
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await usermodel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newPassword, salt);

  user.password = hashed;
  await user.save();

  res.json({ message: "Password reset successfully" });
};

module.exports = {
  userSignup,
  userLogin,
  getUser,
  checkSession,
  storeQuestion,
  allQuestion,
  getAnswer,
  storeAnswer,
  userProfile,
  updateUserData,
  GetAllUsers,
  addCodeSnippet,
  getCodeSnippet,
  AddNewTask,
  getTask,
  updateState,
  deleteTask,
  updateTask,
  uploadPost,
  getAllPost,
  getPost,
  profile,
  sendOTP,
  verifyOTP,
  resetPassword
};
