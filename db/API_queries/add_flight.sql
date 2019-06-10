/*
Admin add_flight(flightID, departureTime, arrivalTime, seatsLeft, totalDistance, adminID, departure, arrival, shipID, pilotID)
Creates a new flight*/

/*
app.get("add_flight", cors(), function(req, res) {
  var flightID = req.params.flightID;
  var departureTime = req.params.departureTime;
  var arrivalTime = req.params.arrivalTime;
  var seatsLeft = req.params.seatsLeft;
  var totalDistance = req.params.totalDistance;
  var adminID = req.params.adminID;
  var departure = req.params.departure;
  var arrival = req.params.arrival;
  var shipID = req.params.shipID;
  var pilotID = req.params.pilotID;

  var sql = "...";
  connection.query(sql, [ flightID, departureTime, arrivalTime, seatsLeft, totalDistance, adminID, departure, arrival, shipID, pilotID ], function(err, rows, fields) {
  })
});
*/
INSERT INTO flight
VALUES	( " + flightID + " , " + departureTime + " , " + arrivalTime + " , " + seatsLeft + " , " + totalDistance + " , " + adminID + " , " + departure + " , " + arrival + " , " + shipID + " , " + pilotID + ");