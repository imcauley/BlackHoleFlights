const express = require('express');
const app = express();
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "104.198.156.225",
    user: "root",
    password: "password"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


