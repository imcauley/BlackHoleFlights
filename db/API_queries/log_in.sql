/*
Buyer log_in(username, password)
retruns the userID of the user with the given username and password*/

/*
app.get("log_in", cors(), function(req, res) {
  var username = req.params.username;
  var password = req.params.password;

  var sql = "...";
  connection.query(sql, [ username, password ], function(err, rows, fields) {
  })
});
*/
SELECT	user.id
FROM	user
WHERE	user.username = " + username + " AND user.password = " + password + ";