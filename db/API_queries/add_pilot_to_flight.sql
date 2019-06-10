/*
Admin add_pilot_to_flight(flightID, pilotID)
Sets the pilot of a flight*/

/*
app.get("sign_up_as_passenger", cors(), function(req, res) {
	var flightID = req.params.flightID
    var pilotID = req.params.pilotID
  

  var sql = "...";
  connection.query(sql, [flightID , pilotID ], function(err, rows, fields) {
  })
});
*/
UPDATE	flight
SET	pilot = " + pilotID + "
WHERE	flight.flightID = " + flightID + ";