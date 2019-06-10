/*
Admin add_pilot(userID, username, password, email, phoneNumber, salary, homeBase)
Creates a new pilot*/

/*
app.get("add_pilot", cors(), function(req, res) {
	var userID = req.params.userID
    var username = req.params.username
    var password = req.params.password
    var email = req.params.email
    var phoneNumber = req.params.phoneNumber
	var salary = req.params.salary
    var homeBase = req.params.homeBase
  

  var sql = "...";
  connection.query(sql, [userID, username, password, email, phoneNumber, salary, homeBase], function(err, rows, fields) {
  })
});
*/
INSERT INTO user
VALUES	( " + userID + " , " + username + " , " + password + " , " + email + " , " + phoneNumber + " );

INSERT INTO pilot
VALUES	(  " + salary + " , " + userID + " , " + homeBase + ");