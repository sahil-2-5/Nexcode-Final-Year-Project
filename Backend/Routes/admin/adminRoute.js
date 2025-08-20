const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminSignup,
  aitool,
  getAiTool,
} = require("../../Controllers/admin/adminController");

const { authenticate } = require("../../Middlewares/admin/admin");

router.post("/login", adminLogin);

router.post("/signup", adminSignup);

router.post("/addNewAiTool", aitool);

router.get("/getAiTool", getAiTool);

module.exports = router;
