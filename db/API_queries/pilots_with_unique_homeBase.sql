/*
get_diversity()
Returns the (planet names, and usernames for pilots), for planets that have only one pilot with that planet as their home base.
*/

SELECT	DST.planetName, USR.username
FROM	User AS USR, Pilot AS PLT, Destination AS DST
WHERE	DST.id IN	(SELECT	D.id
					FROM	Destination as D
					WHERE	EXISTS	(SELECT *
									FROM	Pilot AS P1
									WHERE	P1.homeBase = D.id
											AND NOT EXISTS	(SELECT *
															FROM	Pilot AS P2
															WHERE	P2.homeBase = D.id AND P1.id <> P2.id)))
		AND	DST.id = PLT.homeBase AND USR.id = PLT.id;

/*
app.get("/get_diversity", function(req, res) {

let sql = "SELECT	DST.planetName, USR.username
FROM	User AS USR, Pilot AS PLT, Destination AS DST
WHERE	DST.id IN	(SELECT	D.id
					FROM	Destination as D
					WHERE	EXISTS	(SELECT *
									FROM	Pilot AS P1
									WHERE	P1.homeBase = D.id
											AND NOT EXISTS	(SELECT *
															FROM	Pilot AS P2
															WHERE	P2.homeBase = D.id AND P1.id <> P2.id)))
		AND	DST.id = PLT.homeBase AND USR.id = PLT.id;"
        
                con.query(sql, (error, result, fields) => {
        if (error) throw error;
        data = result;
        res.json({"get diversity": data});
    });

	

*/
