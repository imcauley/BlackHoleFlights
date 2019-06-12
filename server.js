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




app.post("/add_admin", cors(), function(req, res) {

    let userID = req.body.userID


    let sql = "INSERT INTO Admin (`id`) VALUES("+ con.escape(userID) + ");";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"added admin": data});
    });
});


app.post("/add_baggage", function(req, res) {

    let ticketID = req.body.ticketPrice;
    let weight = req.body.weight;
    let bagNumber = req.body.bagNumber;

    let sql =   "INSERT INTO Baggage (`weight`, `bagNumber`, `ticket`) VALUES " +
        "( " + con.escape(weight) + " , " + con.escape(bagNumber) + " , " + con.escape(ticketID) + " );";

  

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"added baggage": data});
    });
});



app.post("/add_destination", function(req, res) {
    let planetName = req.body.planetName;
    let SGX = req.body.SGX;
    let SGY = req.body.SGY;
    let SGZ = req.body.SGZ;

    let sql =  "INSERT INTO Destination (`planetName`, `SGX`, `SGY`, `SGZ`) " +
        "VALUES	(" + con.escape(planetName) + " , " + con.escape(SGX) + " ," +
        " " + con.escape(SGY) + " , " + con.escape(SGZ) + " );";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"added Destination": data});
    });
});


app.post("/add_flight", function(req, res) {
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
        res.json({"add flight": data});
    });


});

app.post("/add_pilot", function(req, res) {


    console.log(req.body.userID);
    let userID = req.body.userID;
    let salary = req.body.salary;
    let homeBase = req.body.homeBase;

    let sql = "INSERT INTO Pilot (`ID`, `salary`, `homeBase` ) VALUES(" + con.escape(userID) + "," + con.escape(salary) + " ," + con.escape(homeBase) +" );";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"added pilot": data});
    })
});



app.put("/add_pilot_to_flight", function(req, res) {
    let flightID = req.body.flightID
    let pilotID = req.body.pilotID

    let sql = "UPDATE Flight SET pilot = " + con.escape(pilotID) + " WHERE	Flight.flightID = " + con.escape(flightID) + ";";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"added pilot to flight": data});
    });
});



app.post("/add_space_ship", function(req, res) {
    let distanceTravelled = req.body.distanceTravelled;
    let activeStatus = req.body.activeStatus;
    let model = req.body.model;

    let sql ="INSERT INTO SpaceShip (`distanceTravelled`, `active`, `model`)" +
        " VALUES	(" + con.escape(distanceTravelled) + " , " + con.escape(activeStatus) + " , " + con.escape(model) + " );";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"add space ship": data});
    });
});

app.post("/add_space_ship_model", function(req, res) {
    let modelName = req.body.modelName;
    let numberofSeats = req.body.numberofSeats;
    let manufacturerName = req.body.manufacturerName;

    let sql ="INSERT INTO SpaceShipModel (`modelName`, `numberofSeats`, `manufacturerName`) +  VALUES " +
        "(" + con.escape(modelName) + " , " + con.escape(numberofSeats) + " , " + con.escape(manufacturerName) + " );";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"ad space_ship model": data});
    });
});


app.post("/buy_ticket", function(req, res) {
    let ticketPrice = req.body.ticketPrice;
    let seat = req.body.seat;
    let ticketID = req.body.ticketID;
    let ownerID = req.body.ownerID;
    let flightID = req.body.flightID;


    let sql =" INSERT INTO Ticket (`ticketPrice`, `seat`, `ticketId`,`ownerID`,`flightID`) VALUES + " +
        "(" + con.escape(ticketPrice) + " , " + con.escape(seat) + " , " + con.escape(ticketID) + ", " + con.escape(ownerID) + ", " +
        " " + con.escape(flightID) +" );";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"Buy ticket": data});
    });
});


app.delete("/cancel_ticket", function(req, res) {
    let ticketID = req.body.ticketID;


    let sql ="DELETE FROM Ticket WHERE Ticket.ticketID = " + con.escape(ticketID) + ";";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"Cancel ticket": data});
    });
});



app.delete("/delete_flight", function(req, res) {
    let flightID = req.body.flightID;


    let sql ="DELETE FROM Flight WHERE Flight.ticketID = " + con.escape(flightID) + ";";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"Delete flight": data});
    });
});




app.get("/get_all_flights", function(req, res) {

    //may have to change this..., I adjusted from params to body.
    let date = req.body.date;

   let sql = " SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival, M.modelName" +
       " FROM	Flight AS F, SpaceShip AS S, SpaceShipModel AS  WHERE	F.departureTime >= " + con.escape(date) + " AND F.ship = " +
       "S.serialNumber AND M.modelNumber = S.model;"

    con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"all flight info": data});
    });

});


app.get("/get_assigned_flights", function(req, res) {

    //may have to change this..., I adjusted from params to body.
    let pilotID = req.body.pilotID;
    let date = req.body.date;

    let sql = " SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival, S.serialNumber, M.modelName " +
   "FROM	Flight AS F, SpaceShip AS S, SpaceShipModel AS M WHERE	F.pilot = " + con.escape(pilotID) + " AND F.departureTime >= " + con.escape(date) + " AND" +
   " F.ship = S.serialNumber AND M.modelNumber = S.model;";


    con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"get assigned flights": data});
    });

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

app.get("/get_trips", function(req, res) {

    let source = req.body.source;
    let destination = req.body.destination;
    let date = req.body.date;

    //todo calculate seats left
    let sql = "SELECT	F.flightID, F.departureTime, F.arrivalTime, F.seatsLeft, F.totalDistance, F.departure, F.arrival," +
        " M.modelName FROM	Flight AS F, SpaceShip AS S, SpaceShipModel AS M WHERE F.departure = " + con.escape(source) + " " +
        "AND F.arrival = " + con.escape(destination) + " AND F.departureTime >= " + con.escape(date) + " AND F.ship = S.serialNumber AND M.modelNumber = S.model;";

    con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"get trips info": data});
    });

});









// this finds all the pilot and planets where there is only one pilot has that planet as their home planet.
app.get("/diversity", function(req, res) {

    let sql = "SELECT    DST.planetName, USR.username FROM    User AS USR, Pilot AS PLT, Destination AS DST WHERE" +
        "    DST.id IN    (SELECT    D.id FROM    Destination as D WHERE    EXISTS    (SELECT * FROM    Pilot AS P1 " +
        "WHERE    P1.homeBase = D.id AND NOT EXISTS    (SELECT * FROM    Pilot AS P2 WHERE    P2.homeBase = D.id AND P1.id <> P2.id)))" +
        "AND    DST.id = PLT.homeBase AND USR.id = PLT.id;";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        data = result;
        res.json({"Diversity": data});
    });
});













////////////
//Start server
server.listen(port, () => {
    console.log('listening on port: ' + port);
});