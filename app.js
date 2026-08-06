const express = require('express');
const cors = require('cors');
const app = express();
const randomstring = require('randomstring');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/auth/setup/', async (req, res) => {
    console.log(req.body); // proves backend received data
    const { email, type } = req.body;
    
    if (!(email.endsWith('@student.curtin.edu.au') || email.endsWith('@curtin.edu.au'))) {
        res.status(403).send('Non-Curtin email address');
    } 
    else if (type === 'staff' && !email.endsWith('@curtin.edu.au')) {
        res.status(403).send('Non-Staff email address');
    } 
    else {
        var newPassword = randomstring.generate();
        // email generated password

        // hash password
        
        switch (type) {
            case 'staff':
                const UCs = mongoose.model('UCs', UCAccountSchema);

                UCs.create({
                    email: email,
                    password: newPassword,
                    salt: salt,
                });
                break;
            case 'student':
                const Students = mongoose.model('Students', studentSchema);

                Students.create({
                    email: email,
                    password: newPassword,
                    salt: salt,
                });
                break;
        }
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    //mongoose.connect('***whatever the URL is***');
});
