-- Find the pilots who have unique home bases

SELECT	D.planetName, U.id
FROM	User AS U, Pilot AS P, Destination as D, 
WHERE	P.homeBase = D.id AND U.id = P.id AND 
GROUP BY	P.homeBase
Having	COUNT(U.username) = 1;