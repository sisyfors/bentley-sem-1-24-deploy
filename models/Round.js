const mongoose = require('mongoose');

const RoundSchema = new mongoose.Schema({
    RoundNumber: {
        type: Number,
        required: true,
    },

    StartDate: {
        type: Date,
        required: true,
    },

    EndDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Round = mongoose.model("round", RoundSchema);

module.exports = Round;