const database = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;
const app = express();

app.use(express.static("./SkateboardImages"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/store", (req,res)=>{
    database.query("SELECT * FROM skateboards", (err, result)=>{
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
        
        if(result.affectedRows > 0) console.log(result);
        else res.send({ message: `Username or Email already exists`});
    });
});

app.post("/login", (req,res)=> {
    const email = req.body.email;
    const password = req.body.password;

    database.query(`SELECT username FROM users WHERE
        email =` + database.escape(email) +` and 
        password =` + database.escape(password), 
        (err, result)=>{
        if(err) throw err;
        
        if(result.length > 0) console.log(result);
        else res.send({ message: `Invalid Email/Password combination`});
    });
});

app.post("/upload", (req,res)=>{

    const image_src = req.body.image_src;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    database.query(`insert into skateboards(image_src, description, price, quantity)
    select * FROM (SELECT`+ database.escape(image_src) +`as image_src,
    `+ database.escape(description) +`as description,
    `+ database.escape(price) +`as price,
    `+ database.escape(quantity) + `as quantity) as new_value
    WHERE NOT EXISTS (
       SELECT description FROM skateboards WHERE
       description = `+ database.escape(description) +`
   ) LIMIT 1;`,(err, result) => {
        if(err) throw err;
        
        if(result.affectedRows > 0) console.log(result);
        else res.send({ message: `Description of Skateboard already exist.`});
    });
});

app.post("/update", (req,res)=>{

    const image_src = req.body.image_src;
    const description = req.body.description;

    database.query(`UPDATE skateboards
        SET image_src =` + database.escape(image_src) +`
        WHERE description =`+ database.escape(description) +`;`
        ,(err, result)=>{
            if(err) throw err;

            if(result.affectedRows > 0) console.log(result);
            else res.send({ message: `Description of Skateboard does not exist.`});
        });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
