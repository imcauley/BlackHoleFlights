var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const con = mysql.createConnection({
  host: "104.198.156.225\"",
  user: "root",
  password: "password",
  database: "cpsc471"
});



con.connect();
app.listen(port);

app.use(cors());
app.use(bodyParser());

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


app.get("/get_paths", (req, res, next) => {

  var params = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"data": params.test});  

  // con.query('SELECT * FROM User', (error, results, fields) => {
  //   if (error) throw error;

  //   data = results[0].username;

  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.json({"first_user": data});
  // });

});

app.get("/get_flights_for_pilot", (req, res, next) => {

  var params = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"data": params.test});  

  // con.query('SELECT * FROM User', (error, results, fields) => {
  //   if (error) throw error;

  //   data = results[0].username;

  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.json({"first_user": data});
  // });

});

app.get("/get_tickets_for_passenger", (req, res, next) => {

  var params = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({"data": params.test});  

  // con.query('SELECT * FROM User', (error, results, fields) => {
  //   if (error) throw error;

  //   data = results[0].username;

  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.json({"first_user": data});
  // });

});

app.post("/add_destination", (req, res, next) => {

  checkAllKeys(req.body, [name, x, y, z]);
  processUserInput(req.body.name);

  var query = `
              INSERT
              INTO Destination
              (id, planetName, SGX, SGY, SGZ)
              VALUES (4345, \"` + req.body.name + `\", ` + req.body.x + `, ` + req.body.y + `, ` + req.body.z + `)`;

  con.query(query, (error, results, fields) => {
    if (error) throw error;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('Added element');
  });
});

app.post("/add_pilot_to_flight", (req, res, next) => {

  //TDOO

  con.query('SELECT * FROM User', (error, results, fields) => {
    if (error) throw error;

    data = results[0].username;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({"first_user": data});
  });

});

app.post("/add_spaceship_model", (req, res, next) => {
  //TDOO

  con.query('SELECT * FROM User', (error, results, fields) => {
    if (error) throw error;

    data = results[0].username;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({"first_user": data});
  });

});

function processUserInput(input) {
  //TODO
  return input;
}
console.log('todo list RESTful API server started on: ' + port);