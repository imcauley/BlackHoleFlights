CREATE DATABASE blackhole;

CREATE TABLE User
(
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(200) NOT NULL,
  password varchar(200) NOT NULL,
  email varchar(200) NOT NULL,
  phoneNumber int(11) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Passenger
(
  id int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Admin
(
  id int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Destination
(
  id int(11) NOT NULL AUTO_INCREMENT,
  planetName varchar(200) NOT NULL,
  SGX int(11) NOT NULL,
  SGY int(11) NOT NULL,
  SGZ int(11) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE SpaceShipModel
(
  modelNumber int(11) NOT NULL AUTO_INCREMENT,
  modelName varchar(200) NOT NULL,
  numberofSeats int(11) NOT NULL,
  manufacturerName varchar(200) NOT NULL,
  PRIMARY KEY (modelNumber)
);

CREATE TABLE Pilot
(
  Salary int(11) NOT NULL,
  id int(11) NOT NULL,
  homeBase int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE,
  FOREIGN KEY (homeBase) REFERENCES Destination(id) ON DELETE CASCADE
);

CREATE TABLE SpaceShip
(
  serialNumber varchar(11) NOT NULL AUTO_INCREMENT,
  distanceTravelled int(11) NOT NULL,
  active bool NOT NULL,
  model int(11) NOT NULL,
  PRIMARY KEY (serialNumber),
  FOREIGN KEY (model) REFERENCES SpaceShipModel(modelNumber) ON DELETE CASCADE
);

CREATE TABLE TrainedFor
(
  pilot int(11) NOT NULL,
  ship int(11) NOT NULL,
  FOREIGN KEY (pilot) REFERENCES Pilot(id),
  FOREIGN KEY (ship) REFERENCES SpaceShipModel(modelNumber)
);

CREATE TABLE Flight
(
  flightID int(11) NOT NULL,
  departureTime datetime NOT NULL,
  arrivalTime datetime NOT NULL,
  totalDistance int(11) NOT NULL,
  createdBy int(11) NOT NULL,
  departure int(11) NOT NULL,
  arrival int(11) NOT NULL,
  ship int(11) NOT NULL,
  pilot int(11),
  PRIMARY KEY (flightID),
  FOREIGN KEY (createdBy) REFERENCES Admin(id) ON DELETE CASCADE,
  FOREIGN KEY (departure) REFERENCES Destination(id) ON DELETE CASCADE,
  FOREIGN KEY (arrival) REFERENCES Destination(id) ON DELETE CASCADE,
  FOREIGN KEY (ship) REFERENCES SpaceShip(serialNumber) ON DELETE CASCADE,
  FOREIGN KEY (pilot) REFERENCES Pilot(id) ON DELETE CASCADE
);

CREATE TABLE Ticket
(
  price int(11) NOT NULL,
  seat int(11) NOT NULL,
  ticketID int(11) NOT NULL,
  owner int(11) NOT NULL,
  flight int(11) NOT NULL,
  PRIMARY KEY (TicketID),
  FOREIGN KEY (Owner) REFERENCES Passenger(id) ON DELETE CASCADE,
  FOREIGN KEY (Flight) REFERENCES Flight(flightID) ON DELETE CASCADE
);

CREATE TABLE Baggage
(
  weight int(11) NOT NULL,
  bagNumber int(11) NOT NULL,
  ticket int(11) NOT NULL,
  FOREIGN KEY (ticket) REFERENCES Ticket(TicketID) ON DELETE CASCADE
);


INSERT INTO User
(`id`, `username`, `password`, `email`, `phoneNumber`)
VALUES
('1', 'Pilot1', '123', 'Pilot1@gmail.com', '111111111'),
('2', 'Pilot2', '123', 'Pilot2@gmail.com', '111111112'),
('3', 'Pilot3', '123', 'Pilot3@gmail.com', '11111113'),
('4', 'Admin1', '123', 'Admin1@gmail.com', '111111111'),
('5', 'Admin2', '123', 'Admin2@gmail.com', '111111111'),
('6', 'Admin3', '123', 'Admin3@gmail.com', '111111111'),
('7', 'Passenger1', '123', 'Passenger1@gmail.com', '111111111'),
('8', 'Passenger2', '123', 'Passenger2@gmail.com', '111111111'),
('9', 'Passenger3', '123', 'Passenger3@gmail.com', '111111111');

INSERT INTO Passenger
VALUES
('7'),
('8'),
('9');


INSERT INTO Admin
(`ID`)
VALUES
('4'),
('5'),
('6');



INSERT INTO SpaceShipModel
(`modelNumber`, `modelName`, `numberofSeats`, `manufacturerName`)
VALUES
('1', 'Excelsior', '10', 'Federation'),
('2', 'Galaxy Class', '20', 'Federation'),
('3', 'Battlestar', '20', 'Colonial'),
('4', 'BaseStar', '30', 'Cylon'),
('5', 'Planet Express', '6', 'Futurama'),
('6', 'Star Destroyer', '30', 'Emprire'),
('7', 'BattleCruiser', '5', 'Terran'),
('8', 'Carrier', '5', 'Protoss'),
('9', 'Leviathan', '5', 'Zerg');

INSERT INTO Pilot
(`ID`, `Salary`, `Homebase`)
VALUES
('1', '1000', 'Atlantis'),
('2', '2000', 'Earth'),
('3', '3000', 'Caprica');



INSERT INTO SpaceShip
(`serialNumber`, `distanceTravelled`, `active`, `model`)
VALUES
('1', '10', '0', '1'),
('2', '20', '1', '2'),
('3', '30', '1', '3'),
('4', '40', '1', '4'),
('5', '50', '1', '5'),
('6', '60', '1', '6'),
('7', '70', '1', '7'),
('8', '80', '1', '8'),
('9', '90', '1', '9');

INSERT INTO TrainedFor
  (`pilot`, `ship`)
VALUES
  ('1', '1'),
  ('2', '2'),
  ('3', '3'),
  ('1', '4'),
  ('2', '5'),
  ('3', '6'),
  ('1', '7'),
  ('2', '8'),
  ('3', '9');


INSERT INTO Baggage
(`weight`, `bagNumber`, `ticket`)
VALUES
('10', '1', '1'),
('20', '2', '1'),
('30', '3', '1'),
('10', '1', '2'),
('40', '1', '3'),
('50', '2', '3'),
('60', '1', '4'),
('70', '2', '4');


