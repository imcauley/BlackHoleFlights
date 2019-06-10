/*
Admin add_spaceshipmodel(modelNumber, modelName, numberofSeats, manufacturerName)
Creates a new model of spaceship*/

/*
app.get("add_spaceshipmodel", cors(), function(req, res) {
  var modelNumber = req.params.modelNumber;
  var modelName = req.params.modelName;
  var numberofSeats = req.params.numberofSeats;
  var manufacturerName = req.params.manufacturerName;

  var sql = "...";
  connection.query(sql, [ modelNumber, modelName, numberofSeats, manufacturerName ], function(err, rows, fields) {
  })
});
*/
INSERT INTO spaceshipmodel
VALUES	( " + modelNumber + " , " + modelName + " , " + numberofSeats + " , " + manufacturerName + " );