/*
Buyer get_trips(source, destination, date)
Returns the flight information for all flights from the source to the destination on or after a given date*/

/*
app.get("get_trips", cors(), function(req, res) {
  var source = req.params.source;
  var destination = req.params.destination;
  var date = req.params.date;

  var sql = "...";
  connection.query(sql, [ source, destination ], function(err, rows, fields) {
  })
});
*/
SELECT	F.flightID, F.departureTime, F.arrivalTime, F.seatsLeft, F.totalDistance, F.departure, F.arrival, M.modelName
FROM	flight AS F, spaceship AS S, spaceshipmodel AS M
WHERE	F.departure = " + source + " AND F.arrival = " + destination + " AND F.departureTime >= " + date + " AND F.ship = S.serialNumber AND M.modelNumber = S.model;