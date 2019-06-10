/*
Buyer buy_ticket(ticketPrice, seat, ticketID, ownerID, flightID)
Creates a new ticket for a passenger on a plane*/

/*
app.get("buy_ticket", cors(), function(req, res) {
	var ticketPrice = req.params.ticketPrice;
    var seat = req.params.seat;
    var ticketID = req.params.ticketID;
	var ownerID = req.params.ownerID;
    var flightID = req.params.flightID;
  

  var sql = "...";
  connection.query(sql, [ticketPrice, seat, ticketID, ownerID, flightID], function(err, rows, fields) {
  })
});
*/
INSERT INTO ticket
VALUES	( " + ticketPrice + " , " + seat + " , " + ticketID + " , " + ownerID + " , " + flightID + " );