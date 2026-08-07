const mongoose = require('mongoose');

const HCIStudentSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },

    Name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const HCIStudent = mongoose.model("hci_student", HCIStudentSchema);

module.exports = HCIStudent;