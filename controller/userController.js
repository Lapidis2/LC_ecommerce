// @ts-nocheck
require('dotenv').config();
const User = require('../modal/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { error } = require('console');

const signup_post = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.json({ message: "user already exist" });
        }
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword,
            isConfirmed: false,
            confirmToken: crypto.randomBytes(20).toString("hex"),
        };
        const user = await User.create(newUser);
        console.log(newUser);
        await user.save();

        const token = await jwt.sign({ user }, process.env.SCRET_KEY, {
            expiresIn: "1hr",
        });

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.Admin_email,
                pass: process.env.admin_psswd,
            },
        });

        const confirmLink = `http://${req.headers.host}/confirm/${user.confirmationToken}`;

        const response = await transporter.sendMail({
            from: process.env.Admin_email,
            to: email,
            subject: "Confirmation of email ",
            html: `<p>Dear ${name},</p>
                <p>Thank you for registering to our website.</p>
                <p>Please click <a href='${confirmLink}'>Here</a>To confirm your account.</p>
                `,
        });
        if (response) {
            return res
                .status(200)
                .send({
                    mesage: "user regisetered success full.Please check your email to confirm",
                    user,
                    token
                });
        } else {
            throw new error("failed to send confirmation token", error);
        }

    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to sign up' });

    }

};

const get_all_user = (req, res) => {}
const get_user = (req, res) => {}
const delete_user = async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            return res.status(402).send({ mesage: 'User not found' })
        }
        return res.status(200).send({ message: 'User deleted successfull' })
    } catch (error) {
        res.status(500).send({ message: 'internal server error', error })
    }
}

module.exports = {

    signup_post,
    get_all_user,
    get_user,
    delete_user
}