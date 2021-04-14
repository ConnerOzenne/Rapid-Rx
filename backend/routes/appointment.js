const pool = require('../db')

module.exports = function appointment(app, logger) {

    // GET /appointment/:appointmentID
    app.get('/appointment/:appointmentID', (req, res) => {
        console.log(req.params.appointmentID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var appointmentID = req.params.appointmentID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`appointments` AS a WHERE a.appointmentID = ?', [appointmentID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        })
                    } else {
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });

    // POST /appointments/create
    //create a new appointment
    app.post('/appointments/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var customerID = req.body.customerID
                var employeeID = req.body.employeeID
                var date = req.body.date
                var orderID = req.body.orderID
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`addresses` (customerID, employeeID, date, orderID) VALUES(?, ?, ?, ?)',[customerID, employeeID, date, orderID], function (err, rows, fields) {
                    if (err) {
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating appointment: \n", err); 
                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error"
                        })
                    } else{
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });
}