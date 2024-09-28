// @ts-nocheck
require('dotenv').config();
const User = require('../modal/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailler = require('nodemailer');
const crypto = require('crypto');

const signup_post = async(req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name: name,
        email: email,

        password: hashedPassword
    }
    const user = await User.create(newUser)
    console.log(newUser);
    await user.save();

    const token = await jwt.sign({ user }, process.env.SCRET_KEY, {
        expiresIn: '1hr'
    });
    res.json({ mesage: "User registration successful", user, token })
};

const signin_post = (req, res) => {}
const get_all_user = (req, res) => {}
const get_user = (req, res) => {}
const delete_user = (req, res) => {}

module.exports = {
    signin_post,
    signup_post,
    get_all_user,
    get_user,
    delete_user
}