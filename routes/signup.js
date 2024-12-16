const express = require("express");
const { createUser, getUserByEmail } = require("../models/createUser");
const authentication = require("../authentication/auth");
const jwt = require("jsonwebtoken");
const route = express.Router();
const SECRET_KEY = "interview_test";
route.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const checkQuery = "SELECT * FROM USER WHERE email=?";

  db.query(checkQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({
        message: "email already exists",
      });
    }

    createUser({ f_name, l_name, email, password }, (err, result) => {
      if (err) {
        return res.status(500);
      }
      res.status(201).json({
        message: "user created successfully",
      });
    });
  });

  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(200).json({ message: "signup successful", token });
});

route.get("/data", authentication, (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      message: "email is required",
    });
  }
  getUserByEmail(email, (err, user) => {
    if (err) return res.status(500);

    if (!user) {
      return res.status(404);
    }

    res.status(200).json({ user });
  });
});
module.exports = route;
