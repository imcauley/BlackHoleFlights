/*
Buyer add_baggage(ticketID, weight, bagNumber)
Adds a babg to the database*/

/*
app.get("add_baggage", cors(), function(req, res) {
	var ticketID = req.params.ticketPrice;
    var weight = req.params.weight;
    var bagNumber = req.params.bagNumber;

  

  var sql = "...";
  connection.query(sql, [ticketID, weight, bagNumber], function(err, rows, fields) {
  })
});
*/
INSERT INTO baggage
VALUES	( " + weight + " , " + bagNumber + " , " + ticketID + " );