/*
Admin get_user(uName)
Returns the userID of a user with the given first and last name*/

/*
app.get("get_user", cors(), function(req, res) {
  var uName = req.params.fName;

  var sql = "...";
  connection.query(sql, [ fName, lName ], function(err, rows, fields) {
  })
});
*/
SELECT	U.id
FROM	User AS U
WHERE	U.username LIKE '%" + uName + "%';