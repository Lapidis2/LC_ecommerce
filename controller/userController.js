// @ts-nocheck
require("dotenv").config();
const User = require("../modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailler = require("nodemailer");
const crypto = require("crypto");
const authMiddleware = require('../middleware/AuthUser');

const signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
  };
  const user = await User.create(newUser);
  console.log(newUser);
  await user.save();

  const token = await jwt.sign({ user }, process.env.SCRET_KEY, {
    expiresIn: "1hr",
  });
  res.json({ mesage: "User registration successful", user, token });
};
// login Route
const signin_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    // Check if user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password"});
    }

    // Create a JWT token
    const token = await jwt.sign({ userId: user._id }, process.env.SCRET_KEY, {
      expiresIn: "1h",
    });
    res.json({message:'login successful',user,token})
  } catch (error) {
    res.json({ message: "Internal server error"},{error:error.mesage});
  }
};
//get all user
const get_all_user = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users)
};
//update user
const update_user = async (req, res) => {
  try {
    const id = req.params.id;
    const {name, email} = req.body;
    console.log(id)





   const updateUser = await User.findByIdAndUpdate(id,{name,email},{new:true});
  console.log(updateUser)
   
   res.status(200).json({ message: "User updated successfully", updateUser });
  }
   catch (error) {
    res.json({ message: "Internal server error"},error); 
  }
};
const get_user = (req, res) => {};
const delete_user = (req, res) => {};

module.exports = {
  signin_post,
  signup_post,
  update_user,
  get_all_user,
  get_user,
  delete_user,
};
