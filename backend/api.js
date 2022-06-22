const database = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Axios = require('axios');
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/store", (req,res)=>{
    database.query("SELECT * FROM skateboards", (err, result)=>{
        if(err) { console.log(err);}
        res.send(result);
    })
});

app.post("/signup",(req,res)=> {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    database.query(`INSERT INTO users (username, email, password) 
    VALUES (?,?,?)`, [username, email, password],
    (err, result) => {
        console.log(err);
    })
});

app.post("/login", (req,res)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const selectedUser = database.query(`SELECT username FROM users WHERE
     username = ${username},
     email = ${email},
     password = ${password}`)
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});