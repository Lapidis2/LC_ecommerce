require('dotenv').config();
const User= require('../modal/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailler = require('nodemailer');
const crypto = require('crypto');
const { use } = require('../routes/userRouter');

// Controller for handling signup form submission
const signup_post = async(req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name: name,
        email: email,
        password: hashedPassword
}
    console.log(newUser);
    const user = await User.create(newUser);
    await user.save()
    res.status(200).json(user)
}

const signin_post = (req, res) => {
}
const get_all_user =  async (req, res) => {
    const user = await User.find();
    res.status(201).json(user);
}
const get_user = (req, res) => {
}
const delete_user = (req, res) => {
}

module.exports = {
    signin_post,
    signup_post,
    get_all_user,
    get_user,
    delete_user
}
