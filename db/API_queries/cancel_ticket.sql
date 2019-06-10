/*
Buyer cancel_ticket(ticketID)
Deletes a buyer's ticket from the database*/

/*
app.get("cancel_ticket", cors(), function(req, res) {
    var ticketID = req.params.ticketID;
  
  var sql = "...";
  connection.query(sql, ticketID , function(err, rows, fields) {
  })
});
*/
DELETE	FROM ticket
WHERE	ticket.ticketID = " + ticketID + ";
