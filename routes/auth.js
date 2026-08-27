const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const nodemailer = require('nodemailer');

mongoose.connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

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

router.post('/setup/', async (req, res) => {
    console.log(req.body); // proves backend received data
    const { email, type } = req.body;
    
    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({username: email}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({username: email}).exec();
            break;
    }

    if (account) {
        res.status(401).send('Account already exists.');
    }
    else if (!(email.endsWith('@student.curtin.edu.au') || email.endsWith('@curtin.edu.au'))) {
        res.status(401).send('Non-Curtin email address');
    } 
    else if (type === 'staff' && !email.endsWith('@curtin.edu.au')) {
        res.status(401).send('Staff must have staff email address');
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
                    email: email,
                    username: email,
                    password: securePassword,
                    salt: salt,
                });
                break;
            case 'student':
                createdAccount = await CapstoneStudent.create({
                    email: email,
                    username: email,
                    password: securePassword,
                    salt: salt,
                });
                break;
        }

        res.status(201).json(createdAccount);
    }
});

router.post('/login/', async (req, res) => {
    console.log(req.body); // proves backend received data
    const { username, password, type } = req.body;
    
    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({username: username}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({username: username}).exec();
            break;
    }

    if (account)
    {
        const saltedPassword = account.salt + password;

        if (argon2.verify(account.password, saltedPassword)) {
            // TODO: generate session token
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

router.post('/otp/', async (req, res) => {
    console.log(req.body); // proves backend received data
    const { username, otp, type } = req.body;
    
    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({username: username}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({username: username}).exec();
            break;
    }

    if (account)
    {
        if (account.otp === otp) {
            account.otp = null;
            await account.save();

            // TODO: generate session token
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

router.post('/email/', async (req, res) => {
    console.log(req.body); // proves backend received data
    // from user session + body
    const { newEmail, username, type } = req.body;

    var account = null;

    switch (type) {
        case 'staff':
            account = await UCAccount.findOne({username: username}).exec();
            break;
        case 'student':
            account = await CapstoneStudent.findOne({username: username}).exec();
            break;
    }

    if (account)
    {
        account.email = newEmail;

        var OTP = randomstring.generate({length: 5, charset: 'numeric'});
        
        await sendOTPEmail(newEmail, OTP);

        // store OTP in schema, then delete once log-in is successful
        // OTP necessary to verify email, otherwise Curtin email is used, though new email is stored
        res.sendStatus(200);
    } 
    else {
        res.status(401).send('Username not found');
    }
});

module.exports = router;
