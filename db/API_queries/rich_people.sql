/*
frequent_fliers(date)
Returns the top 3 spenders within a year of the given date that have also purchased a ticket within 6 months of the given date.
*/

SELECT	U.id AS uID, U.username , SUM(T.price) AS totalCash
FROM	User AS U, Ticket AS T, Flight AS F
WHERE	U.id = T.owner AND T.flight = F.flightID AND F.departureTime > DATE_ADD('2020-04-20 23:59:00', INTERVAL -1 YEAR) AND F.departureTime < '2020-04-20 23:59:00'
GROUP BY	U.id
HAVING		EXISTS	(SELECT *
					FROM	Ticket AS T, Flight AS F
					WHERE	T.owner = uID AND T.flight = F.flightID AND F.departureTime > DATE_ADD('2020-04-20 23:59:00', INTERVAL -6 MONTH))
ORDER BY	totalCash DESC
LIMIT	0, 3;


/*
app.get("/get_frequent_fliers", function(req, res) {

    let dateString = req.body.date;

	let date = dateString[0] + "-" + dateString[1] + "-" + dateString[2] + " 00:00";

	

	let sql = "SELECT	U.id AS uID, U.username , SUM(T.price) AS totalCash
FROM	User AS U, Ticket AS T, Flight AS F
WHERE	U.id = T.owner AND T.flight = F.flightID AND F.departureTime > DATE_ADD(" + con.escape(date) + " , INTERVAL -1 YEAR) AND F.departureTime < " + con.escape(date) + "
GROUP BY	U.id
HAVING		EXISTS	(SELECT *
					FROM	Ticket AS T, Flight AS F
					WHERE	T.owner = uID AND T.flight = F.flightID AND F.departureTime > DATE_ADD(" + con.escape(date) + ", INTERVAL -6 MONTH))
ORDER BY	totalCash DESC
LIMIT	0, 3;"

    con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({" get frequent fliers": data});
    });



*/