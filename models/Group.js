const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    Confirmed: {
        type: Number,
        required: true,
    },

    GroupNumber: {
        type: Number,
        required: true,
    },

    Project: {
        type: String,
        required: true,
    },

    Reason: {
        type: String,
        required: true,
    },

    Students: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

const Group = mongoose.model("group", GroupSchema);

module.exports = Group;