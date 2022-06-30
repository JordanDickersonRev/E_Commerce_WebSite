const database = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/store", (req,res)=>{
    database.query("SELECT * FROM skateboards", (err, result)=>{
        if(err) { console.log(err);}
        res.send(result);
    });
});

app.get("/users", (req, res)=>{
    database.query(`SELECT COUNT(username) From users`,
    (err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.post("/signup",(req,res)=> {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    database.query(`insert into users(username, email, password)
    select * FROM (SELECT`+ database.escape(username) +`as username,
    `+ database.escape(email) +`as email,
    `+ database.escape(password) +`as password) as new_value
    WHERE NOT EXISTS (
       SELECT username AND email FROM users WHERE
       username = `+ database.escape(username) +` OR
       email = `+ database.escape(email) +`
   ) LIMIT 1;`,(err, result) => {
        if(err) throw err;
        
        if(result.affectedRows > 0){
            console.log(result);
        }
        else {
            res.send({ message: "Username or Email already exists"})
        }
    });
});

app.post("/login", (req,res)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    database.query(`SELECT username FROM users WHERE
        username =`+ database.escape(username) +`,
        email =`+ database.escape(email) +`,
        password =`+ database.escape(password)
    ), (err, result) => {
        if(err) {
            console.log(err);
        }
    };
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
