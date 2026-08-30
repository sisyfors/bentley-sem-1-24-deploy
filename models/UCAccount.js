const mongoose = require('mongoose');

const UCAccountSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true,
    },

    Name: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    Username: {
        type: String,
        required: true,
    },

    Password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const UCAccount = mongoose.model("uc_account", UCAccountSchema);

module.exports = UCAccount;