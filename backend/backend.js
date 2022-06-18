let mysql = require('mysql');
let database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "skatehouse"
});

module.exports = database;