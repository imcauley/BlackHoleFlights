/*
Admin add_spaceship(serialNo, distanceTravelled, activeStatus, model)
Adds a new spaceship to the database*/

/*
app.get("add_spaceship", cors(), function(req, res) {
  var serialNo = req.params.serialNo;
  var distanceTravelled = req.params.distanceTravelled;
  var activeStatus = req.params.activeStatus;
  var model = req.params.model;

  var sql = "...";
  connection.query(sql, [ serialNo, distanceTravelled, activeStatus, model ], function(err, rows, fields) {
  })
});
*/
INSERT INTO spaceship
VALUES	( " + serialNo + " , " + distanceTravelled + " , " + activeStatus + " , " + models + " );