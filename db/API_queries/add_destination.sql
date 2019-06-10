/*
Admin add_destination(planetID, planetName, SGX, SGY, SGZ)
Adds a new destination to the database*/

/*
app.get("add_destination", cors(), function(req, res) {
  var planetID = req.params.planetID;
  var planetName = req.params.planetName;
  var SGX = req.params.SGX;
  var SGY = req.params.SGY;
  var SGZ = req.params.SGZ;

  var sql = "...";
  connection.query(sql, [ planetID, planetName, SGX, SGY, SGZl ], function(err, rows, fields) {
  })
});
*/
INSERT INTO destination
VALUES	( " + planetID + " , " + planetName + " , " + SGX + " , " + SGY + " , " + SGY + " );