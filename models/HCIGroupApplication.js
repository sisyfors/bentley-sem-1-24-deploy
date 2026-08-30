const mongoose = require('mongoose');

const StudentsAndResponsesSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Response: {
        type: Number,
        required: true
    }
});

const HCIGroupApplicationSchema = new mongoose.Schema({
    GroupCreator: {
        type: String,
        required: true,
    },

    StudentsAndResponses: [StudentsAndResponsesSchema]
}, { timestamps: true });

const HCIGroupApplication = mongoose.model("hci_application", HCIGroupApplicationSchema);

module.exports = HCIGroupApplication;