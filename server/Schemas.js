//I needed a working schema on my branch, so I made this. 
//it's temporary and I will have it replaced with Lincoln's schema's soon

const mongoose = require("mongoose")

const ucAccountSchema = new mongoose.Schema({
  Type: String,
  Name: String,
  Email: String,
  Username: String,
  Password: String
})

module.exports = mongoose.model("UCAccounts", ucAccountSchema)