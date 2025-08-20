const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const adminmodel = require("../../Models/admin/admin");
const aimodel = require("../../Models/admin/aitool");

const adminSignup = async (req, res) => {
  let { name, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const admin = await adminmodel.create({
        adminName : name,
        email,
        password: hash,
      });
      let token = jwt.sign(
        { email: email, adminid: admin._id },
        process.env.ADMIN_S_KEY
      );
      await admin.save();
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 36000,
        secure: false,
      });
      res.json({ status: true, message: "admin registerd..", admin });
    });
  });
};

const adminLogin = async (req, res) => {
  let { email, password } = req.body;

  const admin = await adminmodel.findOne({ email });
  if (!admin) return res.status(500).send("something is wrong");

  bcrypt.compare(password, admin.password, async (err, result) => {
    if (result) {
      let token = jwt.sign({ id: admin._id }, process.env.ADMIN_S_KEY, {
        expiresIn: "7d",
      });
      req.session.admin = { email, adminId: admin._id };
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 36000,
        secure: false,
      });
      await admin.save();
      const authHeader = `Bearer ${token}`;
      res.setHeader("Authorization", authHeader);
      return res.json({ status: true, message: "login successfully", token });
    } else {
      res.send("wrong password");
    }
  });
};

const aitool = async (req, res) => {
  const { iconUrl, toolName,category, description, visitLink } = req.body;
  const aitool = await aimodel.create({
    iconUrl,
    toolName,
    category,
    description,
    visitLink,
  });
  await aitool.save();
  res.json({ status: true, message: "AI Tool added successfully", aitool });
}

const getAiTool = async (req, res) => {
  const tools = await aimodel.find({});
  if (!tools) return res.status(500).send("something is wrong");
  res.json({ status: true, message: "AI Tools fetched successfully", tools });
};


module.exports = {
  adminLogin,
  adminSignup,
  aitool,
  getAiTool
};
