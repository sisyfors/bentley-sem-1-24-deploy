const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const nodemailer = require('nodemailer');

// TODO: Is database connection persistent?
// mongoose.connect('***whatever the URL is***');


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
    
    if (!(email.endsWith('@student.curtin.edu.au') || email.endsWith('@curtin.edu.au'))) {
        res.status(403).send('Non-Curtin email address');
    } 
    else if (type === 'staff' && !email.endsWith('@curtin.edu.au')) {
        res.status(403).send('Staff must have staff email address');
    } 
    else {
        var newPassword = randomstring.generate(12);
        const salt = randomstring.generate(16);
        
        await sendPasswordEmail(email, newPassword);

        const securePassword = argon2.hash(salt + newPassword);

        switch (type) {
            case 'staff':
                const UCs = mongoose.model('UCs', UCAccountSchema);

                await UCs.create({
                    email: email,
                    username: email,
                    password: securePassword,
                    salt: salt,
                });
                break;
            case 'student':
                const Students = mongoose.model('Students', studentSchema);

                await Students.create({
                    email: email,
                    username: email,
                    password: securePassword,
                    salt: salt,
                });
                break;
        }
    }
});

router.post('/login/', async (req, res) => {
    console.log(req.body); // proves backend received data
    const { username, password, type } = req.body;
    
    switch (type) {
        case 'staff':
            const UCs = mongoose.model('UCs', UCAccountSchema);

            const account = await UCs.findOne({username: username}).exec();
            break;
        case 'student':
            const Students = mongoose.model('Students', studentSchema);

            const account = await Students.findOne({username: username}).exec();
            break;
    }

    if (account)
    {
        const saltedPassword = account.salt + password;

        if (argon2.verify(account.password, saltedPassword)) {
            // generate session token
        } 
        else {
            res.status(403).send('Incorrect password');
        }
    } 
    else {
        res.status(403).send('Username not found');
    }
});

router.post('/otp/', async (req, res) => {
    console.log(req.body); // proves backend received data
    const { username, otp, type } = req.body;
    
    switch (type) {
        case 'staff':
            const UCs = mongoose.model('UCs', UCAccountSchema);

            const account = await UCs.findOne({username: username}).exec();
            break;
        case 'student':
            const Students = mongoose.model('Students', studentSchema);

            const account = await Students.findOne({username: username}).exec();
            break;
    }

    if (account)
    {
        if (account.otp === otp) {
            account.otp = null;
            await account.save();

            // generate session token
        } 
        else {
            res.status(403).send('Incorrect OTP');
        }
    } 
    else {
        res.status(403).send('Username not found');
    }
});



module.exports = router;
