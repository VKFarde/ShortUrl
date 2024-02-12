const express = require("express");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const saltRound = 10;
const key = process.env.key;

const userControl = {
  auth: async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    try {
      const valid = jwt.verify(token, key);

      req.user = valid;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password Required" });
    }

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ error: "User not Registered", success: false });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user._id, email: user.email }, key, {
          expiresIn: "1h",
        });
        res
          .status(200)
          .json({ token: token, success: true, msg: "login successful" });
      } else {
        res.status(400).json({ msg: "Incorrect Password", success: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error", success: false });
    }
  },

  register: async (req, res) => {
    const { email, password, cpass } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and Password are required fields." });
    }
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email is already registered." });
      }
      const salt = await bcrypt.genSalt(saltRound);
      const hashpass = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        password: hashpass,
      });

      await newUser.save();

      res.status(200).json({ msg: "User Register successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  logout: async (req, res) => {
    // Implement logout logic here
  },
};

module.exports = userControl;
