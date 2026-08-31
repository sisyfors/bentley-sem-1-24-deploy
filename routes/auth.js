const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const joi = require('joi');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_STRING);

const {
    CapstoneStudent,
    Group,
    HCIGroupApplication,
    HCIStudent,
    Project,
    ProjectApplication,
    Round,
    UCAccount
} = require("../models/index.js");

const createWebToken = async (username, userType) => {
    return jwt.sign({username, userType}, process.env.WEB_TOKEN_KEY, { expiresIn: 3 * 24 * 60 * 60});
}

const verifySession = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.WEB_TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).send('Invalid token');
      } else {
        next();
      }
    });
  } else {
    res.status(401).send('Not authorised');
    throw new Error('Not authorized, no token');
  }
};

const sendPasswordEmail = async (to, password) => {
  try {
    // Creates a connection to the email server
    // TODO: Must create email account and fill in details
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // TODO: Create an html template later
    const emailContent = {
      from: process.env.FROM_EMAIL,
      to: to,
      subject: 'Welcome, here are your details',
      text: `Here is your default password: ${password}`,
    };

    // Send the email
    const info = await transporter.sendMail(emailContent);
    console.log('Email sent:', info.messageId);
  } 
  catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendOTPEmail = async (to, otp) => {
  try {
    // Creates a connection to the email server
    // TODO: Must create email account and fill in details
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // TODO: Create an html template later
    const emailContent = {
      from: process.env.FROM_EMAIL,
      to: to,
      subject: 'OTP Code',
      text: `Here is your one-time-password: ${otp}`,
    };

    // Send the email
    const info = await transporter.sendMail(emailContent);
    console.log('Email sent:', info.messageId);
  } 
  catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const validationSchemas = {
    setupSchema: joi.object({
        email: joi.string().email().required(),
        type: joi.string().valid('staff', 'student').required(),}),
    loginSchema: joi.object({
        username: joi.string().email().required(),
        password: joi.string().required(),
        type: joi.string().valid('staff', 'student').required(),}),
    otpSchema: joi.object({
        username: joi.string().email().required(),
        otp: joi.number().required(),
        type: joi.string().valid('staff', 'student').required(),}),
    emailSchema: joi.object({
        newEmail: joi.string().email().required(),}),
};

const validateParameters = (schema, property) => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error == null) {
            next();
        } else {
            const { details } = error;
            const message = details.map(error => error.message).join(',');

            res.status(422).json({ error: message });
        }
    };
};

router.post('/setup', validateParameters(validationSchemas.setupSchema), async (req, res) => {
    const { email, type } = req.body;
    
    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({Username: email}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({Username: email}).exec();
            break;
    }

    if (account) {
        res.status(422).send('Account already exists');
    }
    else if (!(email.endsWith('@student.curtin.edu.au') || email.endsWith('@curtin.edu.au'))) {
        res.status(422).send('Non-Curtin email address');
    } 
    else if (type === 'staff' && !email.endsWith('@curtin.edu.au')) {
        res.status(422).send('Staff must have staff email address');
    } 
    else {
        var newPassword = randomstring.generate(12);
        const salt = randomstring.generate(16);
        
        await sendPasswordEmail(email, newPassword);

        const securePassword = argon2.hash(salt + newPassword);

        var createdAccount = null;

        switch (type) {
            case 'staff':
                createdAccount = await UCAccount.create({
                    Email: email,
                    Username: email,
                    Password: securePassword,
                    Salt: salt,
                });
                break;
            case 'student':
                createdAccount = await CapstoneStudent.create({
                    Email: email,
                    Username: email,
                    Password: securePassword,
                    Salt: salt,
                });
                break;
        }

        res.status(201).json(createdAccount);
    }
});

router.post('/login', validateParameters(validationSchemas.loginSchema), async (req, res) => {
    const { username, password, type } = req.body;
    
    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({Username: username}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({Username: username}).exec();
            break;
    }

    if (account)
    {
        const saltedPassword = account.Salt + password;

        if (await argon2.verify(account.Password, saltedPassword)) {
            const token = await createWebToken(account.Username, type);
            res.cookie("token", token, {withCredentials: true, httpOnly: false});
            res.sendStatus(200);
        } 
        else {
            res.status(401).send('Incorrect password');
        }
    } 
    else {
        res.status(401).send('Username not found');
    }
});

router.post('/otp', validateParameters(validationSchemas.otpSchema), async (req, res) => {
    const { username, otp, type } = req.body;
    
    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({Username: username}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({Username: username}).exec();
            break;
    }

    if (account)
    {
        if (account.OTP === otp) {
            const token = await createWebToken(account.Username, type);
            res.cookie("token", token, {withCredentials: true, httpOnly: false});
            res.sendStatus(200);
        } 
        else {
            res.status(401).send('Incorrect OTP');
        }
    } 
    else {
        res.status(401).send('Username not found');
    }
});

router.post('/email', validateParameters(validationSchemas.emailSchema), verifySession, async (req, res) => {
    // From user session + body

    const decodedToken = jwt.verify(req.cookies.token, process.env.WEB_TOKEN_KEY);

    const username = decodedToken.username;
    const type = decodedToken.userType;

    const { newEmail } = req.body;

    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({Username: username}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({Username: username}).exec();
            break;
    }

    if (account)
    {
        account.Email = newEmail;

        var OTP = randomstring.generate({length: 5, charset: 'numeric'});
        
        await sendOTPEmail(newEmail, OTP);

        account.OTP = OTP;
        await account.save();
        // OTP necessary to verify email, otherwise Curtin email is used, though new email is stored
        res.sendStatus(200);
    } 
    else {
        res.status(400).send('Account not found');
    }
});

module.exports = { router, verifySession };