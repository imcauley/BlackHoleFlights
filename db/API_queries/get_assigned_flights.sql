/*
Pilot get_assigned_flights(pilotID, date)
Returns the flight information for all flights a pilot is signed up for on or after a given date*/

/*
app.get("get_assigned_flights", cors(), function(req, res) {
  var pilotID = req.params.pilotID;
  var date = req.params.date;

  var sql = "...";
  connection.query(sql, [pilotID, date], function(err, rows, fields) {
  })
});
*/
SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival, S.serialNumber, M.modelName
FROM	flight AS F, spaceship AS S, spaceshipmodel AS M
WHERE	F.pilot = " + pilotID + " AND F.departureTime >= " + date + " AND F.ship = S.serialNumber AND M.modelNumber = S.model;