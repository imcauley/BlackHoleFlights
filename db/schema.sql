CREATE DATABASE blackhole;

CREATE TABLE User
(
  id int(11) NOT NULL,
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
  FOREIGN KEY (id) REFERENCES User(id)
);

CREATE TABLE Admin
(
  id int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES User(id)
);

CREATE TABLE Destination
(
  id int(11) NOT NULL,
  planetName varchar(200) NOT NULL,
  SGX int(11) NOT NULL,
  SGY int(11) NOT NULL,
  SGZ int(11) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE SpaceShipModel
(
  modelNumber int(11) NOT NULL,
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
  FOREIGN KEY (id) REFERENCES User(id),
  FOREIGN KEY (homeBase) REFERENCES Destination(id)
);

CREATE TABLE SpaceShip
(
  serialNumber int(11) NOT NULL,
  distanceTravelled int(11) NOT NULL,
  active bool NOT NULL,
  model int(11) NOT NULL,
  PRIMARY KEY (serialNumber),
  FOREIGN KEY (model) REFERENCES SpaceShipModel(modelNumber)
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
  seatsLeft int(11) NOT NULL,
  totalDistance int(11) NOT NULL,
  createdBy int(11) NOT NULL,
  departure int(11) NOT NULL,
  arrival int(11) NOT NULL,
  ship int(11) NOT NULL,
  pilot int(11) NOT NULL,
  PRIMARY KEY (flightID),
  FOREIGN KEY (createdBy) REFERENCES Admin(id),
  FOREIGN KEY (departure) REFERENCES Destination(id),
  FOREIGN KEY (arrival) REFERENCES Destination(id),
  FOREIGN KEY (ship) REFERENCES SpaceShip(serialNumber),
  FOREIGN KEY (pilot) REFERENCES Pilot(id)
);

CREATE TABLE Ticket
(
  price int(11) NOT NULL,
  seat int(11) NOT NULL,
  ticketID int(11) NOT NULL,
  owner int(11) NOT NULL,
  flight int(11) NOT NULL,
  PRIMARY KEY (TicketID),
  FOREIGN KEY (Owner) REFERENCES Passenger(id),
  FOREIGN KEY (Flight) REFERENCES Flight(flightID)
);

CREATE TABLE Baggage
(
  weight int(11) NOT NULL,
  bagNumber int(11) NOT NULL,
  ticket int(11) NOT NULL,
  FOREIGN KEY (ticket) REFERENCES Ticket(TicketID)
);