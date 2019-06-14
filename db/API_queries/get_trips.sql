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
SELECT	T.ticketID, F.flightID
FROM	Flight AS F, User as U, Ticket as T
WHERE	U.id = " + userID + "  AND F.flightID = T.flight AND U.id = T.owner;



-get_tickets(user_id: int) -> {status: int, tickets: [{ticketID: int, flight_number: int}]}