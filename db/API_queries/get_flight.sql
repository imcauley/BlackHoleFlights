/*
Buyer get_flight(flightNo)
Returns the flight information for a specific flight
*/

/*
app.get("get_flight", cors(), function(req, res) {
  var flightNo = req.params.flightNo;

  var sql = "...";
  connection.query(sql, flightNo , function(err, rows, fields) {
  })
});
*/
SELECT	F.flightID, F.departureTime, F.arrivalTime, F.seatsLeft, F.totalDistance, F.departure, F.arrival, M.modelName
FROM	flight AS F, spaceship AS S, spaceshipmodel AS M
WHERE	F.flightID = " + flightNo + " AND F.ship = S.serialNumber AND M.modelNumber = S.model;