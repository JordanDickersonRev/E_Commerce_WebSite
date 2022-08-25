const database = require('./database');
const express = require('express');
const cors = require('cors');
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/store", (req,res)=>{

    const size = req.query.size;

    if(size === 'ALL'){
        database.query("SELECT * FROM skateboards", (err, result)=>{
            if(err) throw err;
            res.send(result);
        });
    }
    else {
        database.query(`SELECT * FROM skateboards where
        size = ` + database.escape(size),
        (err,result)=>{
            if(err) throw err;
            res.send(result);
        });
    }
});

app.post("/store", (req,res)=>{

    const image_src = req.body.image_src;
    const description = req.body.description;
    const size = req.body.size;
    const price = req.body.price;
    const quantity = req.body.quantity;

    database.query(`insert into skateboards(image_src, description, size, price, quantity)
    select * FROM (SELECT`+ database.escape(image_src) +`as image_src,
    `+ database.escape(description) +`as description,
    `+ database.escape(size) + `as size,
    `+ database.escape(price) +`as price,
    `+ database.escape(quantity) + `as quantity) as new_value
    WHERE NOT EXISTS (
       SELECT description FROM skateboards WHERE
       description = `+ database.escape(description) +`
   ) LIMIT 1;`,(err, result) => {
        if(err) throw err;
        
        if(result.affectedRows > 0) res.send({ message: `Skateboard was successfully uploaded.`})
        else res.send({ message: `Description of Skateboard already exist.`});
    });
});

app.put("/store", (req,res)=>{

    const image_src = req.body.image_src;
    const description = req.body.description;

    database.query(`UPDATE skateboards
        SET image_src =` + database.escape(image_src) +`
        WHERE description =`+ database.escape(description) +`;`
        ,(err, result)=>{
            if(err) throw err;

            if(result.affectedRows > 0) res.send({ message: `Skateboard image was successfully updated.`});
            else res.send({ message: `Description of Skateboard does not exist.`});
        });
});

app.post("/users",(req,res)=> {

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
        
        if(result.affectedRows > 0) res.send({ message: `success`});
        else res.send({ message: `Username or Email already exists`});
    });
});
 
app.get("/users", (req,res)=> {
    const email = req.query.email;
    const password = req.query.password;

    database.query(`SELECT username FROM users WHERE
        email like binary` + database.escape(email) +` and 
        password like binary` + database.escape(password), 
        (err, result)=>{
        if(err) throw err;
        
        if(result.length > 0) res.send(result[0].username);
        else res.send({ message: `Invalid Email/Password combination`});
    });
});

app.get("/favorites", (req,res)=>{

    const username = req.query.username;

    database.query(`SELECT * FROM favorites where 
    id in (select id from users where username = `+ database.escape(username)+`)`,
    (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

app.post("/favorites", (req,res)=>{
    const image_src = req.body.image_src;
    const description = req.body.description;
    const size = req.body.size;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const username = req.body.username;

    database.query(`insert into favorites(image_src, description, size, price, quantity, id)
    select * FROM (SELECT` + database.escape(image_src) + `as image_src,`
    + database.escape(description) + ` as description,`
    + database.escape(size) + ` as size,`
    + database.escape(price) +` as price,`
    + database.escape(quantity) +` as quantity,
    (select id from users where username =` + database.escape(username) +`) as id) as new_value
    WHERE NOT EXISTS (
       SELECT description AND id FROM favorites WHERE
       description = `+ database.escape(description) + ` AND
       id = (select id from users where username = `+ database.escape(username) + `)
   ) LIMIT 1;`, (err,result)=>{
        if(err) throw err;

        if(result.affectedRows > 0) res.send({ message: `Skateboard was added to your favorites.`})
        else res.send({ message: `Skateboard is already in your favorites.`});
   });
});

app.delete('/favorites', (req,res)=>{
    const description = req.body.description;
    const username = req.body.username;

    database.query(`delete from favorites where description = `
    + database.escape(description) + 
    ` and id in (select id from users where username = ` 
    +database.escape(username) + `)`,
    (err, result)=>{
        if(err) throw err;

        if(result.affectedRows > 0) res.send({ message: `Skateboard was dropped from your favorites.`});
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});