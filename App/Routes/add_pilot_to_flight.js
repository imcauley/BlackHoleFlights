const express = require('express');
const router = express.Router();

/*
a add_flight(..)
a add_pilot_to_flight(...)
a add_spaceship(...)
a add_location(...)
a add_admin(...)
a add_pilot(...)
p add_pilot_to_flight(...)
a delete_ticket
a admin_deleteFlights
*/


// add_pilot_to_flight
router.post('user/', function(req, res, next){
    var sql = "INSERT INTO USERS (name, address) VALUES ('Company Inc', 'Highway 37')";


});


//delete project
router.delete('flight/:id', function(req, res) {

    Project.remove({_id: req.params.id}, (err, result) => {
        if (err) {
            let message = {status: 'Error', message: ("There was a problem deleting the project - " + err)};
            res.json(message);
        } else {
            let message = {status: 'Success', message: "Project Deleted"};
            res.json(message);
        }
    });
});