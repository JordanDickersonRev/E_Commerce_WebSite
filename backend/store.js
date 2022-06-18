const database = require('./backend');
const express = require('express');
const PORT = 3000;
const app = express();
app.use(express.json());


app.get("/store", (req,res)=>{
    database.query("SELECT * FROM skateboards", (err, result)=>{
        if(err) { console.log(err);}
        res.send(result);
    })
})

/*app.post("/signup",(req,res)=> {

    let username = '943gamer';
    let email = '943gamers@gmail.com';
    let password = '943winning';

    database.query(`INSERT INTO users (username, email, password) 
    VALUES (?,?,?)`, [username, email, password],

    (err, result) => {
        if(err) {console.log(err);}
        res.send(result);
        res.end();
    })
})*/

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})