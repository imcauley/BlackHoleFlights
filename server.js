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

app.get("/get_tickets_for_passenger", (req, res, next) => {

    var params = req.query;
  
    //PARAMETERS: {user_id: int}

    //FORMAT
    // {
    // "status:": 200,
    // "tickets": [
    //     {
    //     seat: 24,
    //     ticketID: 23423,
    //     flight_number: 567313
    //     },
    //     {
    //     seat: 23,
    //     ticketID: 2456,
    //     flight_number: 534523
    //     },
    //     {
    //     seat: 8,
    //     ticketID: 234643,
    //     flight_number: 324513
    //     }
    // ]
    // }
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.json([]);  
  
    // con.query('SELECT * FROM User', (error, results, fields) => {
    //   if (error) throw error;
  
    //   data = results[0].username;
  
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   res.json({"first_user": data});
    // });
  
  });


function getSeatsLeft(flightID){



    let sql = "SELECT (SELECT    M.numberofSeats FROM    SpaceShip AS S, SpaceShipModel AS M, Flight AS F " +
    "WHERE    S.model = M.modelNumber AND F.ship = S.serialNumber AND F.flightID = " + con.escape(flightID) + ") - " +
    "(SELECT    COUNT(*) AS numSeats FROM    Ticket AS T, Flight AS F WHERE  T.flight = F.flightID AND F.flightID = " + con.escape(flightID) + ") AS seatsLeft;";


    con.query(sql, (error, result, fields) => {
        if (error) throw error;
       var data = result;
       console.log(data[0].seatsLeft);

    });


}


app.get("/get_seats_left", function(req, res) {

    let flightID = req.body.flightID;

    data = getSeatsLeft(flightID);

    res.json({"get seats left": data});



});

    app.get("/get_trips", function(req, res) {

    let source = req.body.source;
    let destination = req.body.dest;
    let dateString = req.body.date.split(":");

    let date = dateString[0] + "-" + dateString[1] + "-" + dateString[2] + " 00:00";

    console.log(date);

    //Parameters: {source: string, dest: string, date:int:int:int}
    //date is a string with three ints sperated by colons: year:month:day
    //Format:
    //{
    // status: 200,
    // trips: [
    // {
    //   source: "Earth",
    //   destination: "Mars",
    //   flights: [
    //     {
    //       dep_year:"2020",
    //       dep_month:"09",
    //       dep_day:"20",
    //       flight_number:"56376324",
    //       source:"Earth",
    //       dest:"Venus",
    //       dep_hour:"20",
    //       dep_minute:"15",
    //       seats_left:"7"
    //     },
    //     {
    //       year:"2020",
    //       month:"09",
    //       day:"20",
    //       flight_number:"2343212304",
    //       source:"Venus",
    //       dest:"Mars",
    //       dep_hour:"20",
    //       dep_minute:"15",
    //       seats_left:"3"
    //     },
    //   ]
    // }...}

   
    //todo calculate seats left
    let sql = "SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival," +
        " M.modelName FROM	Flight AS F, SpaceShip AS S, SpaceShipModel AS M WHERE F.departure = " + con.escape(source) + " " +
        "AND F.arrival = " + con.escape(destination) + " AND F.departureTime >= " + con.escape(date) + " AND F.ship = S.serialNumber AND M.modelNumber = S.model " +
        ";";

    con.query(sql, (error, result, fields) => {
        if (error) throw error;
       let data = result;
       let source = 0;


       var dataFormatted = {
            status : "200",
            trips : [{
                source : '0',
                destination : '1',
                flights : [{
                    "seats_left": '10'
                }],
           }],
        };

        for(let i = 0; i < data.length; i++) {
            let obj = data[i];
            dataFormatted.trips[0].source = obj.departure; //this shouldn't be in the loop I guess.
            dataFormatted.trips[0].destination = obj.arrival;
           // console.log(getSeatsLeft(obj.flightID));
            let x = getSeatsLeft(obj.flightID);
            console.log(x);
            dataFormatted.trips[0].flights.push({
                    "seats_left" : x,
                    "flight_number":obj.flightID,
                    "dep_year": obj.departureTime.getFullYear(),
                    "dep`_month" : obj.departureTime.getMonth(),
                    "dep_hour" : obj.departureTime.getDay(),
                    "dep_minute" : obj.departureTime.getUTCHours(),
                    "arr_year" :obj.arrivalTime.getFullYear(),
                    "arr_month" : obj.arrivalTime.getMonth(),
                    "arr_hour" : obj.arrivalTime.getUTCHours(),
                    "arr_minute" : obj.arrivalTime.getUTCMinutes()
            });
        }

        res.json({"formated": dataFormatted});
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