/*
Admin add_admin(userID, username, password, email, phoneNumber)
Creates a new administrator*/

/*
app.get("add_admin", cors(), function(req, res) {
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

INSERT INTO admin
VALUES	(" + userID + ");