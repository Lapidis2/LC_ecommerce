const express = require("express");
const router = express.Router();
const {
  signin_post,
  signup_post,
  get_user,
  get_all_user,
} = require("../controller/userController");

// Signup routes
router.get("/signup", get_all_user); // Corrected from /sigup to /signup
router.post("/signup", signup_post); // Corrected from /sigup to /signup

// Signin routes
router.get("/", get_user);
router.post("/signin", signin_post);

module.exports = router;
