const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const admin = require('./app/routes/admin');
const customers = require('./app/routes/customers');
const pilots = require('./app/routes/pilots');
const con = mysql.createConnection({
    host: "104.198.156.225",
    user: "root",
    password: "password",
    database: "cpsc471"
});


con.connect();

app.use(cors());
app.use(bodyParser());
app.use('/api/admin', admin);
app.use('/api/customers', customers);
app.use('/api/pilots', pilots);


app.get("/api_test", (req, res, next) => {
    console.log('lol');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({"data": "this is test data"});
});



app.get("/get_flight", cors(), function(req, res) {

    //may have to change this..., I adjusted from params to body.
    let flightNo = req.body.flightNo;


    //todo calculate seats left
    let sql = "SELECT	F.flightID, F.departureTime, F.arrivalTime, " +
        "F.totalDistance, F.departure, F.arrival, M.modelName FROM	Flight AS F, SpaceShip AS S, " +
        "SpaceShipModel AS M WHERE	F.flightID = " + con.escape(flightNo) + " AND F.ship = S.serialNumber AND " +
        "M.modelNumber = S.model;";

    con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"flight info": data});
    });


});


app.post("/add_flight", cors(), function(req, res) {
    let departureTime = req.body.departureTime;
    let arrivalTime = req.body.arrivalTime;
    let totalDistance = req.body.totalDistance;
    let adminID = req.body.adminID;
    var departure = req.body.departure;
    var arrival = req.body.arrival;
    var shipID = req.body.shipID;
    var pilotID = req.body.pilotID;

    let sql = "INSERT INTO Flight (`DepartureTime`, `ArrivalTime`, `totalDistance`, `pilot`, `Departure`, `Arrival`, `ship`, `createdBy`)" +
        "VALUES	( " + con.escape(departureTime)
        + " , " + con.escape(arrivalTime) + " , " + con.escape(totalDistance)
        + " , " + con.escape(pilotID) + " , " + con.escape(departure) + " , " + con.escape(arrival) + " , " + con.escape(shipID)
        + " , " + con.escape(adminID) + ")";

    con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"flight info": data});
    });


});



app.get("/db_test", (req, res, next) => {

    con.query('SELECT * FROM User', (error, results, fields) => {
        if (error) throw error;

        data = results;

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



////////////
//Start server
server.listen(port, () => {
    console.log('listening on port: ' + port);
});