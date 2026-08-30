//currently if you want to run this you can use the command
//    node .\localHostServer.js

//this program will not fully work without a mongodb to connect to

const express = require("express")
const mongoose = require("mongoose")
const ucAccounts = require("./Schemas.js")

const app = express()
const PORT = 50000

//not fully sure how neccessary this is
app.get('/', (req, res) => {
    res.send("welcome to this webpage")
});

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
});


//1. this will not work without a mongodb database on your computer, in this case mine is localhosted with a db named test
//2. currently this code just returns the UC's name, a proof of concept for any data that we may need to pull from the db.
//3. this is not very secure as anybody requesting the right URI could trigger this. Security will need to be figured out later.
app.get('/api/getUC', async (req, res) => {
    mongoose.connect("mongodb://localhost/Test")
    const uc = await ucAccounts.findOne()
    mongoose.connection.close()
    res.send(uc.name)
});











    
    
