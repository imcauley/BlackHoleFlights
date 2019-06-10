/*
Admin delete_flight(flightID)
Removes a flight from the database*/

/*
app.get("delete_flight", cors(), function(req, res) {
  var flightID = req.params.flightID;

  var sql = "...";
  connection.query(sql, flightID , function(err, rows, fields) {
  })
});
*/
DELETE	FROM flight
WHERE	flight.flightID = " + flightID + ";