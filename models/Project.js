const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
  },

  Round: {
    type: Number,
    required: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  IntendedSize: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;