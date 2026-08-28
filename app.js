const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoute = require('./routes/auth');

// Use routes
app.use('/auth', authRoute);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
