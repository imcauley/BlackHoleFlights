import csv
import mysql.connector as mysql
import random


cred = {
     'host': "104.198.156.225",
     'user': "root",
     'password': "password",
     'database': "cpsc471"
}





def populate_planets():
    db = mysql.connect(**cred)
    cursor = db.cursor()

    query = """
            INSERT 
            INTO Destination
            (id, planetName, SGX, SGY, SGZ)
            VALUES (%s, %s, %s, %s, %s)
            """

    planets = []
    i = 0
    with open('planets.csv', 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            x = random.randint(1,10000000)
            y = random.randint(1,10000000)
            z = random.randint(1,10000000)
            planets.append((i, row[0], x, y, z))
            i += 1

    print(planets)
    cursor.executemany(query, planets)

    db.commit()

    db.close()

if __name__ == "__main__":
    populate_planets()