const fetchUser = require('../middleware/FetchUser')
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "thisisinotebookreactapp";

//create user ('api/auth')
router.post(
  "/createuser",
  [
    body("email", "enter valid email").isEmail(),
    body("name", "min 3 character").isLength({ min: 3 }),
    body("password", "too weak password must be greater than 5 char").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      //check weather user exist or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ err: "account exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      //if user doesnot exist create one
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      const data = {
        user: {
          id: user.id
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      res.json({ user, authToken });
    } catch (error) {
      console.log(error);
      res.json({ msg: "an error occured" });
    }
  }
);
//login user
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "blank not allowed").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ err: "wrong credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ err: "wrong credentialsss" });
      }

      const data = {
        user: {
          id: user.id,
          email: user.email
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ user, authToken });
    } catch (error) {
      console.log(error);
      res.json({ msg: "an error occured" });
    }
  }
);

//get logged in user details
router.post("/getuser",fetchUser,async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(req.user);
      const user = await User.findById(userId).select("-password");
      res.send(user);
      console.log(user);
    } catch (error) {
      console.log(error);
      res.json({ msg: "an error occured at get user" });
    }
  }
);

module.exports = router;

//sourav
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0YjgzNzE0NzNlOTQwYzUzOThiOTMzIiwiZW1haWwiOiJzb3VyYXZAZ21haWwuY29tIn0sImlhdCI6MTYzMjMzODgyMH0.oeoByVZXuntHAxUPtIoSB5f19H3Yj38YLVsmOCbTqgQ

//akhil
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0YjgzNzQ0NzNlOTQwYzUzOThiOTM2IiwiZW1haWwiOiJha2hpbEBnbWFpbC5jb20ifSwiaWF0IjoxNjMyMzM4ODYyfQ.IGkRRiCGVoB2wX2ZmfSnnFNXtcpUDAbe8rShzlSxw6w