require('dotenv').config();
const User= require('../modal/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailler = require('nodemailer');
const crypto = require('crypto');

// Controller for handling signup form submission
const signup_post =async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hash(password,11);
    const newUser = {
        name: name,
        email: email,

        password: hashPassword 
    }
  
    console.log(newUser);
          await newUser.save()
    res.redirect('/signin'); 
   
    }

  


const signin_post = (req, res) => {
}



const get_all_user = (req, res) => {
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
