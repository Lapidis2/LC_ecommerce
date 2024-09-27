require('dotenv').config();
const User= require('../modal/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailler = require('nodemailer');
const crypto = require('crypto');

// Controller for handling signup form submission
const signup_post = async(req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name: name,
        email: email,
        password: hashedPassword 
    }

    const isexisting = await User.findOne({email});
    if(isexisting){ return  res.status(403).json({meessage: "User aready exist."})}
    
const user= await User.create(newUser);
 await user.save()
    console.log(user);

    //token gen
    const token = jwt.sign({user},process.env.SCRET_KEY, {expiresIn:'10s'});
    console.log('token generated',token)

    res.json(user,token)
}

const signin_post = (req, res) => {
}


// retrive user
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
