/*
Buyer sign_up_as_passenger(userID, username, password, email, phoneNumber)
Creates a new passenger*/

/*
app.get("sign_up_as_passenger", cors(), function(req, res) {
	var userID = req.params.userID
    var username = req.params.username
    var password = req.params.password
    var email = req.params.email
    var phoneNumber = req.params.phoneNumber
  

  var sql = "...";
  connection.query(sql, [userID , username , password , email , phoneNumber], function(err, rows, fields) {
  })
});
*/
INSERT INTO user
VALUES	( " + userID + " , " + username + " , " + password + " , " + email + " , " + phoneNumber + " );

INSERT INTO passenger
VALUES	(" + userID + ");