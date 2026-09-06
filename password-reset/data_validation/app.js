const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth.js');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.redirect('auth/resetPassword');
});

// Reset Password
app.get('/', (req, res) => {
  res.redirect('auth/resetPassword');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

mongoose.connect('mongodb+srv://amelia:ameliak@cluster0.pweqjys.mongodb.net/?appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongDB', err);
  })
