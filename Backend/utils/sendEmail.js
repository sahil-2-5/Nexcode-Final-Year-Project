const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "NexCode - Email Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
        <p>Hello,</p>
        <p>Your OTP for verifying your email on <strong>NexCode</strong> is:</p>

        <h2 style="text-align: center; color: #2d89ef;">${otp}</h2>

        <p>Please enter this OTP to continue. This code is valid for <strong>5 minutes</strong>.</p>

        <p style="color: #999; font-size: 13px;">
          If you did not request this, you can safely ignore this email.
        </p>

        <p style="margin-top: 20px;">– The NexCode Team</p>
      </div>
    `,
  });
};

module.exports = sendOTPEmail;
