const express = require("express");
const router = express.Router();

const multerFile = require("../../utils/multerFile");

const {
  userSignup,
  userLogin,
  getUser,
  checkSession,
  storeQuestion,
  allQuestion,
  storeAnswer,
  getAnswer,
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
} = require("../../Controllers/user/userController");

const { authenticate } = require("../../Middlewares/user/user");

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.get("/data", authenticate, getUser);

router.get("/checkSession", checkSession);

router.post("/addQuestion", storeQuestion);

router.get("/getAllQuestion", allQuestion);

router.post("/addAnswer", storeAnswer);

router.get("/getAnswer/:id", getAnswer);

router.post("/setProfile", multerFile, userProfile);

router.put("/update/:id", updateUserData);

router.get("/users", GetAllUsers);

router.post("/addCodeSnippet", addCodeSnippet);

router.get("/getCodeSnippet", getCodeSnippet);

router.post("/addtask", AddNewTask);

router.get("/getTasks/:id", getTask);

router.put("/updateStatuse/:id", updateState);

router.delete("/deleteTask/:id", deleteTask);

router.put("/updateTask/:id", updateTask);

router.post("/uploadNewPost", multerFile, uploadPost);

router.get("/getAllPost", getAllPost);

router.get("/getPost/:id", getPost);

router.get("/profile/:id", profile);

router.post("/sendOTP", sendOTP);

router.post("/verifyOTP", verifyOTP);

router.post("/resetPassword", resetPassword);

module.exports = router;
