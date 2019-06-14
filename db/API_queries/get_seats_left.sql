 /*
 get_seats_left(flightID)
 Returns the number of seats left on a given flight.
 */
 
 SELECT
	(SELECT	M.numberofSeats
	FROM	SpaceShip AS S, SpaceShipModel AS M, Flight AS F
	WHERE	S.model = M.modelNumber AND F.ship = S.serialNumber AND F.flightID = 33)
    -
    (SELECT	COUNT(*) AS numSeats
	FROM	Ticket AS T, Flight AS F
	WHERE	T.flight = F.flightID AND F.flightID = 33) AS seatsLeft;
    
    /*
    get_seats_left(flightID)
    
    app.get("/get_seats_left", function(req, res) {

    let flightID = req.body.flightID;
    
	let sql = "SELECT
	(SELECT	M.numberofSeats
	FROM	SpaceShip AS S, SpaceShipModel AS M, Flight AS F
	WHERE	S.model = M.modelNumber AND F.ship = S.serialNumber AND F.flightID = " + flightID + ")
    -
    (SELECT	COUNT(*) AS numSeats
	FROM	Ticket AS T, Flight AS F
	WHERE	T.flight = F.flightID AND F.flightID = " + flightID + ") AS seatsLeft;
    
        con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"get seats left": data});
    });
    */

