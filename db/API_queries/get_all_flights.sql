/*
Admin get_all_flights(date)
Returns the flight information for all flights on or after a given date*/

/*
app.get("get_all_flights", cors(), function(req, res) {
  var date = req.params.date;

  var sql = "...";
  connection.query(sql, date, function(err, rows, fields) {
  })
});
*/
SELECT	F.flightID, F.departureTime, F.arrivalTime, F.totalDistance, F.departure, F.arrival, M.modelName
FROM	flight AS F, spaceship AS S, spaceshipmodel AS M
WHERE	F.departureTime >= " + date + " AND F.ship = S.serialNumber AND M.modelNumber = S.model;