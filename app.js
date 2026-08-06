const express = require('express');
const cors = require('cors');
const app = express();
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

app.post('/auth/setup/', async (req, res) => {
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
        
        sendPasswordEmail(email, newPassword);

        const securePassword = argon2.hash(salt + newPassword);

        switch (type) {
            case 'staff':
                const UCs = mongoose.model('UCs', UCAccountSchema);

                UCs.create({
                    email: email,
                    password: securePassword,
                    salt: salt,
                });
                break;
            case 'student':
                const Students = mongoose.model('Students', studentSchema);

                Students.create({
                    email: email,
                    password: securePassword,
                    salt: salt,
                });
                break;
        }
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    //mongoose.connect('***whatever the URL is***');
});
