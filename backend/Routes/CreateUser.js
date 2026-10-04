const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.post("/createuser",
  [
    body(
      "email",
      "Incorrect email format (Correct format: user@homebites.com)"
    ).isEmail(),

    body(
      "password",
      "Incorrect Password (Minimum length of password: 8)"
    ).isLength({ min: 5 }),

    body("name",
       "Incorrect name (Minimum length of name: 5)"
      ).isLength({min: 5}),

    body("location").not().isEmpty(),

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location
      });
      console.log("User created: ", newUser);
      const responseData = {
        ...newUser._doc,
        date: new Date(newUser.date).toISOString(),
      };
      res.json({
        success: true,
        data: responseData,
      });
    }
    catch (error) {
      console.error("Error creating user: ", error);
      res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  })
router.post("/loginuser",
  [
    body(
      "email",
      "Incorrect email format (Correct format: example@example.com)"
    ).isEmail(),
    body(
      "password",
      "Incorrect Password (Minimum length of password: 5)"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(req.body.password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ errors: "Invalid password" });
      }
      const data = {
        user: {
          id: userData.id
        }
      }
      const authToken = jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken: authToken });
    }
    catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  })
module.exports = router;
