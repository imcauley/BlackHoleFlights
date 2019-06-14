-- get_only_alien_pilots() Selects the users that have ONLY flown on planes, that were flown by a pilots, that have a home base other than earth

SELECT	U.username
FROM	User as U
WHERE	exists	(SELECT	*
				FROM	Ticket AS T1, Flight AS F1
                WHERE	T1.owner = U.id AND T1.flight = F1.flightID
						AND	EXISTS	(SELECT	*
									FROM	Pilot AS P1, Destination AS D1
                                    WHERE	P1.id = F1.pilot AND P1.homeBase = D1.id AND D1.planetName <> "Earth"))
		AND NOT exists	(SELECT	*
				FROM	Ticket AS T2, Flight AS F2
                WHERE	T2.owner = U.id AND T2.flight = F2.flightID
						AND	EXISTS	(SELECT	*
									FROM	Pilot AS P2, Destination AS D2
                                    WHERE	P2.id = F2.pilot AND P2.homeBase = D2.id AND D2.planetName = "Earth"))
ORDER BY	U.id;


/*
app.get("/get_only_alien_pilots", function(req, res) {

let sql = "SELECT	U.username
FROM	User as U
WHERE	exists	(SELECT	*
				FROM	Ticket AS T1, Flight AS F1
                WHERE	T1.owner = U.id AND T1.flight = F1.flightID
						AND	EXISTS	(SELECT	*
									FROM	Pilot AS P1, Destination AS D1
                                    WHERE	P1.id = F1.pilot AND P1.homeBase = D1.id AND D1.planetName <> "Earth"))
		AND NOT exists	(SELECT	*
				FROM	Ticket AS T2, Flight AS F2
                WHERE	T2.owner = U.id AND T2.flight = F2.flightID
						AND	EXISTS	(SELECT	*
									FROM	Pilot AS P2, Destination AS D2
                                    WHERE	P2.id = F2.pilot AND P2.homeBase = D2.id AND D2.planetName = "Earth"))
ORDER BY	U.id;"

                con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"get only alien pilots": data});
    });

*/