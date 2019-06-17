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

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "blackhole"
// });



const con = mysql.createConnection({
    host: "104.198.156.225",
    user: "root",
    password: "password",
    database: "cpsc471",
    multipleStatements: true
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
        if (err)  {res.json({status:400})} else{
        data = result;
        res.json({status: 200, "added admin": data});
    }});
});


app.post("/add_baggage", function(req, res) {

    let ticketID = req.body.ticketPrice;
    let weight = req.body.weight;
    let bagNumber = req.body.bagNumber;

    let sql =   "INSERT INTO Baggage (`weight`, `bagNumber`, `ticket`) VALUES " +
        "( " + con.escape(weight) + " , " + con.escape(bagNumber) + " , " + con.escape(ticketID) + " );";

  

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({status:400})} else{
        data = result;
        res.json({status: 200, "added baggage": data});
    }});
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
        if (err)  {res.json({status:400})} else{
        data = result;
        res.json({status: 200, "added": data});
    }});

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
        if (error)  {res.json({status:400})} else {
        data = result;
        res.json({status:200, "add flight": data});
    }});


});

app.post("/add_pilot", function(req, res) {


    console.log(req.body.userID);
    let userID = req.body.userID;
    let salary = req.body.salary;
    let homeBase = req.body.homeBase;

    let sql = "INSERT INTO Pilot (`ID`, `salary`, `homeBase` ) VALUES(" + con.escape(userID) + "," + con.escape(salary) + " ," + con.escape(homeBase) +" );";
    con.query(sql, function(err, result, fields) {
        if (err)  {res.json({status:400})}
        data = result;
        res.json({status:200,"added pilot": data});
    })
});



app.put("/add_pilot_to_flight", function(req, res) {
<<<<<<< HEAD
    let flightID = req.body.flightID
    let pilotID = req.body.pilotID
    let userName = req.body.userName;
=======
    let flightID = req.body.flight_number; 
    let pilotID = req.body.user_id;
>>>>>>> d611bbb6ee6e5777b9acea9498e5d7ebb2c89b59


    if(pilotID.length>=1) {
        let sql = "UPDATE Flight SET pilot = " + con.escape(pilotID) + " WHERE	Flight.flightID = " + con.escape(flightID) + ";";
        con.query(sql, function (err, result, fields) {
            if (err) {
                res.json({status: 400})
            }
            data = result;
            res.json({"added pilot to flight": data});
        });
    }
    else if (userName.length>=1){
        let sql = "Update Flight, Pilot as P, User as U SET Flight.pilot = P.id WHERE U.username = " + con.escape(userName) + " AND P.id = U.id AND" +
            "Flight.flightID = " + con.escape(flightID)+";";
        con.query(sql, function (err, result, fields) {
            if (err) {
                res.json({status: 400})
            }
            data = result;
            res.json({"added pilot to flight": data});
        });
    }
    else{
        res.json({status: 400})
    }
});



app.post("/add_space_ship", function(req, res) {
    let distanceTravelled = req.body.distanceTravelled;
    let activeStatus = req.body.activeStatus;
    let model = req.body.model;

    let sql ="INSERT INTO SpaceShip (`distanceTravelled`, `active`, `model`)" +
        " VALUES	(" + con.escape(distanceTravelled) + " , " + con.escape(activeStatus) + " , " + con.escape(model) + " );";

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({status:400})}
        data = result;
        res.json({status:200, "add space ship": data});
    });
});

app.post("/add_space_ship_model", function(req, res) {
    let modelName = req.body.modelName;
    let numberofSeats = req.body.numberofSeats;
    let manufacturerName = req.body.manufacturerName;

    let sql ="INSERT INTO SpaceShipModel (`modelName`, `numberofSeats`, `manufacturerName`) +  VALUES " +
        "(" + con.escape(modelName) + " , " + con.escape(numberofSeats) + " , " + con.escape(manufacturerName) + " );";

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({status:400})}
        data = result;
        res.json({status:200, "add space_ship model": data});
    });
});


app.post("/add_ticket", function(req, res) {
    let ticketPrice = req.body.ticketPrice;
    let seat = req.body.seat;
    let ticketID = req.body.ticketID;
    let ownerID = req.body.ownerID;
    let flightID = req.body.flightID;


    let sql =" INSERT INTO Ticket (`ticketPrice`, `seat`, `ticketId`,`ownerID`,`flightID`) VALUES + " +
        "(" + con.escape(ticketPrice) + " , " + con.escape(seat) + " , " + con.escape(ticketID) + ", " + con.escape(ownerID) + ", " +
        " " + con.escape(flightID) +" );";

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({status:400})}
        data = result;
        res.json({status: 200, "add ticket": data});
    });
});


app.post("/buy_ticket", function(req, res) {

    let user_id = req.body.user_id;

    let flights = req.body.flights.split(',');
    let queries = [];
    for(let i = 0; i < flights.length; i++) {
        queries.push(`INSERT INTO Ticket
                    (price, seat, owner, flight)
                    VALUES (100, 6, ${user_id}, ${flights[i]});`)
    };

    con.query(queries.join(' '), function (err, result) {
        if (err) {res.json({status:400})} else {
        data = result;
        res.json({status: 200, "bought": data});
    }});
});



app.put("/assign_flight", function(req, res) {

    let flightID = req.body.flightID;
    let user_id = req.body.user_id;


    let sql =" UPDATE Flight SET Flight.pilot = " + con.escape(user_id) + "WHERE  "+ con.escape(flightID) + " = Flight.flightID;";

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({err,status:400})}
        data = result;
        res.json({status: 200, "assign flight": data});
    });


});


app.delete("/cancel_ticket", function(req, res) {
    let ticketID = req.body.ticketID;


    let sql ="DELETE FROM Ticket WHERE Ticket.ticketID = " + con.escape(ticketID) + ";";

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({status:400})}
        data = result;
        res.json({status: 200, "Cancel ticket": data});
    });
});



app.delete("/delete_flight", function(req, res) {
    let flightID = req.body.flightID;


    let sql ="DELETE FROM Flight WHERE Flight.ticketID = " + con.escape(flightID) + ";";

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({status:400})}
        data = result;
        res.json({status: 200 ,"Delete flight": data});
    });
});


app.get("/get_all_destinations", function(req, res) {

    let sql ="SELECT id, planetName FROM Destination;";

    con.query(sql, function (err, result, fields) {
        if (err)  {res.json({status:400})}
        data = result;
        res.json({status: 200, destinations: data});
    });


});


app.get("/get_all_flights", function(req, res) {


    let date = req.query.date;

   let sql = " SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival, M.modelName" +
       " FROM	Flight AS F, SpaceShip AS S, SpaceShipModel AS  WHERE	F.departureTime >= " + con.escape(date) + " AND F.ship = " +
       "S.serialNumber AND M.modelNumber = S.model;"

    con.query(sql, (error, result, fields) => {
        if (error)  {res.json({status:400})}
        data = result;
        res.json({status:200, "all flight info": data});
    });

});




app.get("/get_assigned_flights", function(req, res) {


    let ID = req.query.user_id;
    let date = get_current_date();

    let sql = " SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival, S.serialNumber, M.modelName " +
        "FROM	Flight AS F, SpaceShip AS S, SpaceShipModel AS M WHERE	F.pilot = " + con.escape(ID) + " AND F.departureTime >= " + con.escape(date) + " AND" +
        " F.ship = S.serialNumber AND M.modelNumber = S.model;";


    con.query(sql, (error, result, fields) => {
        if (error)  {res.json({status:400})}
        let  data = result;
        let flights = [];
        for(let i = 0; i < data.length; i++) {
            let obj = data[i];
            flights.push({
                destination : obj.departure,
                source : obj.arrival,
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
        res.json({"status": 200, "flights": flights});
    });

});



app.get("/get_unassigned_flights", function(req, res) {


    let sql = "SELECT F.`arrivalTime`, F.`departureTime`, F.`flightID`, F.`departure`, F.`arrival` FROM Flight as F " +
        "WHERE F.pilot IS NULL";

    con.query(sql, (error, result, fields) => {
        if (error)  {res.json({status:400})} else{
        let  data = result;
        let flights = [];
        for(let i = 0; i < data.length; i++) {
            let obj = data[i];
            flights.push({
                destination : obj.departure,
                source : obj.arrival,
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

        res.json({status: 200, flights});
    }});

});




app.get("/get_flight", function(req, res) {

    //may have to change this..., I adjusted from params to body.
    let flightNo = req.query.flightNo;


    //todo calculate seats left
    let sql = "SELECT	F.flightID, F.departureTime, F.arrivalTime, " +
        "F.totalDistance, F.departure, F.arrival, M.modelName FROM	Flight AS F, SpaceShip AS S, " +
        "SpaceShipModel AS M WHERE	F.flightID = " + con.escape(flightNo) + " AND F.ship = S.serialNumber AND " +
        "M.modelNumber = S.model;";

    con.query(sql, (error, result, fields) => {
        if (error)  {res.json({status:400})} else {
            data = result;
            res.json({status: 200, "flight info": data});
        }})


});

app.get("/get_tickets", (req, res, next) => {
   // get_tickets(user_id: int) -> {status: int, tickets: [{ticketID: int, flight_number: int}]} // REMOVED SEAT #

    let sql = "SELECT T.ticketID, T.seat, F.flightID as flight_number FROM	Flight AS F, User as U, Ticket as T WHERE" +
    " U.id =  " + con.escape(req.query.user_id) + "  AND F.flightID = T.flight AND U.id = T.owner;";


    con.query(sql, (error, result, fields) => {
        if (error) {console.log(error); res.json({status:400})}
        else {
            res.json({status:200, tickets: result})
        }
    });

  
});

app.get("/get_user_type", (req, res, next) => {
    // get_tickets(user_id: int) -> {status: int, tickets: [{ticketID: int, flight_number: int}]} // REMOVED SEAT #
 
    let sql1 = `SELECT COUNT(*) as count FROM Pilot WHERE id=${con.escape(req.query.user_id)}`
    let sql2 = `SELECT COUNT(*) as count FROM Admin WHERE id=${con.escape(req.query.user_id)}`
 
    con.query(sql1, (error1, result1, fields) => {
        if (error1) {res.json({status:400})} else {
            con.query(sql2, (error2, result2, fields) => {
                if (error2) {res.json({status:400})} else {
                    res.json({status:200, is_admin:result2[0].count, is_pilot:result1[0].count})
            }});
    }});
 
   
 });

app.get("/get_frequent_fliers", (req, res, next) => {
   // +get_frequent_fliers(date:int:int:int) -> {status: int, users: [{username: string, id: int, phone_number: int, email: string, totalSpend: int}]}

    let sql = "SELECT T.ticketID, F.flightID as flight_number FROM	Flight AS F, User as U, Ticket as T WHERE " +
        " U.id =  " + con.escape(req.query.username) + "  AND F.flightID = T.flight AND U.id = T.owner;";

    con.query(sql, (error, result, fields) => {
        if (error) {res.json({status:400})} else {
            res.json({status:200, tickets: result})
        }
    });


});

app.get("/get_not_pilots", function(req, res) {

    let sql = "SELECT	U.username, U.id, U.phoneNumber, U.email FROM	User as U WHERE	U.id NOT IN (SELECT  U.id FROM  Pilot as P WHERE U.id = P.id);";

    con.query(sql, (error, result, fields) => {
        if (error) { res.json({status:400})} else {
            res.json({status:200, users: result})
        }
    });

});

app.get("/get_not_admins", function(req, res) {

    let sql = "SELECT	U.username, U.id, U.phoneNumber, U.email FROM	User as U WHERE	U.id NOT IN (SELECT  U.id FROM  Admin as A WHERE U.id = A.id);";

    con.query(sql, (error, result, fields) => {
        if (error) { res.json({status:400}) } else {
            res.json({status:200, users: result})
        }
    });

});



app.get("/login", function(req, res) {

    let query = `SELECT id
                FROM User
                WHERE username = "${req.query.username}"
                AND password = "${req.query.password}"`

    con.query(query, (error, result, fields) => {
        if (error) {res.json({status:400})} else {
            res.json({status:200, user_id: result[0].id})
        }
    });

});


app.post("/signup", function(req, res) {

    let query1 = `SELECT id
                FROM User
                WHERE username = "${req.body.username}"
                OR email = "${req.body.email}"`

    let query2 = `INSERT INTO User
                  (username, email, password, phoneNumber)
                  VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}', ${req.body.phone_number})`

    let query3 = `SELECT id
                    FROM User
                    WHERE username = "${req.body.username}"
                    AND password = "${req.body.password}"`

    con.query(query1, (error1, result1) => {
        if (error1 || result1.length > 0) { res.json({status:400}) }
        else {
            con.query(query2, (error2, result2) => {
                if (error2) { res.json({status:400}) }
                else {
                    con.query(query3, (error3, result3) => {
                        if (error3) { res.json({status:400}) }
                        else {
                            res.json({status:200, user_id: result3[0].id})
                        }
                    });
                }
            });
        }
    });
});



function getSeatsLeft(flightID, callback){
    const getSeatsLeftsql = "SELECT (SELECT    M.numberofSeats FROM    SpaceShip AS S, SpaceShipModel AS M, Flight AS F " +
        "WHERE    S.model = M.modelNumber AND F.ship = S.serialNumber AND F.flightID = " + con.escape(flightID) + ") - " +
        "(SELECT    COUNT(*) AS numSeats FROM    Ticket AS T, Flight AS F WHERE  T.flight = F.flightID AND F.flightID = " + con.escape(flightID) + ") AS seatsLeft;";

    con.query(getSeatsLeftsql, (error, result, fields) => {
        if (error) throw error;
        var data = result;
        callback(data[0].seatsLeft);
    });
}



app.get("/get_trips", function(req, res) {

    let source = req.query.source;
    let destination = req.query.dest;
    let dateString = req.query.date.split(":");

    let date = dateString[0] + "-" + dateString[1] + "-" + dateString[2] + " 00:00";

   
    //todo calculate seats left
    let sql = "SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival," +
        " M.modelName FROM	Flight AS F, SpaceShip AS S, SpaceShipModel AS M WHERE F.departure = " + con.escape(source) + " " +
        "AND F.arrival = " + con.escape(destination) + " AND F.departureTime >= " + con.escape(date) + " AND F.ship = S.serialNumber AND M.modelNumber = S.model " +
        ";";

    con.query(sql, (error, result, fields) => {
        if (error)  {res.json({status:400})} else{
       let data = result;
       let source = 0;


       let dataFormatted = {
            trips : [{
                source : '0',
                destination : '1',
                flights : [

                ],
           }],
        };

        for(let i = 0; i < data.length; i++) {
            let obj = data[i];
            dataFormatted.trips[0].source = obj.departure; //this shouldn't be in the loop I guess.
            dataFormatted.trips[0].destination = obj.arrival;
           // console.log(getSeatsLeft(obj.flightID));
            // let x = getSeatsLeft(obj.flightID);
            dataFormatted.trips[0].flights.push({
                    "seats_left" : '10',
                    "flight_number":obj.flightID,
                    "dep_year": obj.departureTime.getFullYear(),
                    "dep`_month": obj.departureTime.getMonth(),
                    "dep_hour": obj.departureTime.getDay(),
                    "dep_minute": obj.departureTime.getUTCHours(),
                    "arr_year": obj.arrivalTime.getFullYear(),
                    "arr_month": obj.arrivalTime.getMonth(),
                    "arr_hour": obj.arrivalTime.getUTCHours(),
                    "arr_minute": obj.arrivalTime.getUTCMinutes()
                });

        res.json({status: 200, ...dataFormatted});
        };
    }});
});




// this finds all the pilot and planets where there is only one pilot has that planet as their home planet.
app.get("/diversity", function(req, res) {

    let sql = "SELECT    DST.planetName, USR.username FROM    User AS USR, Pilot AS PLT, Destination AS DST WHERE" +
        "    DST.id IN    (SELECT    D.id FROM    Destination as D WHERE    EXISTS    (SELECT * FROM    Pilot AS P1 " +
        "WHERE    P1.homeBase = D.id AND NOT EXISTS    (SELECT * FROM    Pilot AS P2 WHERE    P2.homeBase = D.id AND P1.id <> P2.id)))" +
        "AND    DST.id = PLT.homeBase AND USR.id = PLT.id;";

    con.query(sql, function (error, result, fields) {
        if (error)  {res.json({status:400})} else {
            data = result;
            res.json({"Diversity": data});
        }});
});



function get_current_date() {
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);

    return date;
}



////////////
//Start server
server.listen(port, () => {
    console.log('listening on port: ' + port);
});