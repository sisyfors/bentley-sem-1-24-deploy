const express = require('express');
const cors = require('cors');
const app = express();

app.set('view engine', 'pug');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    console.log(req.body); // proves backend recived data
    const { username, password } = req.body;
    const user = 
    {
        username: 'admin',
        password: '1234'
    };

    if (username === user.username && password === user.password)
    {
        res.send('Login successful');
    } 
    else 
    {
        res.send('Invalid username or password');
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
