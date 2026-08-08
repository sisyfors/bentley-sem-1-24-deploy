const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const resetPasswordSchema = Joi.object().keys({
    password: Joi.string().required(),
    reconfirmPassword: Joi.string().required()
});

// Process reset password
router.post('/resetPassword', async(req, res) => {
    console.log("Reset Password");
    console.log("User input:", req.body);

    const { error } = resetPasswordSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const { password, reconfirmPassword } = req.body;

    if (password !== reconfirmPassword) {
        console.log("Passwords do not match");
        return res.status(400).json({
            message: "Passwords do not match"
        });
    }
    
    console.log("Password Changed Successfully!")

    try {
        const hash = await bcrypt.hash(password, 8);
        const user = new User({
            password: hash
        });

        await user.save();

        return res.status(200).json({
            message: "Password Changed Successfully!"
        });
    }
    catch (err) {
        console.error("Reset Password Error:", err)

        return res.status(500).json({
            message: "Failed to reset password!"
        });
    }
});

module.exports = router;

