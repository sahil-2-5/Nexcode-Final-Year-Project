const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const conn = require("./config");
const session = require("express-session");

const userRoute = require("./Routes/user/userRoute");
const adminRoute = require("./Routes/admin/adminRoute");

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_S_KEY, // Secret to sign the session ID cookie
    resave: false, // Don't save session if it's not modified
    saveUninitialized: false, // Don't store uninitialized session data
    cookie: {
      httpOnly: true, // Don't allow client-side JS to access cookie
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Cookie expiry time (1 day)
    },
  })
);

app.get("/", cors(), (req, res) => {
  res.send("It's working");
});

app.use("/user", userRoute);

app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`server run at ${port}`);
});
