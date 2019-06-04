var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blackhole"
});

con.connect();
app.listen(port);

app.get("/api_test", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({"data": "this is test data"});
});


app.get("/db_test", (req, res, next) => {

  con.query('SELECT * FROM User', (error, results, fields) => {
    if (error) throw error;

    data = results[0].username;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({"first_user": data});
  });

});


console.log('todo list RESTful API server started on: ' + port);