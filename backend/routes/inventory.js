const pool = require('../db')

module.exports = function inventory(app, logger) {

    // GET /inventory/:pharmacyID
    app.get('/inventory/:pharmacyID', (req, res) => {
        console.log(req.params.pharmacyID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.params.pharmacyID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`inventory` AS i WHERE i.pharmacyID = ?', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching inventory for pharmacyID: \n", err);
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

    //user story 9.2 
    //view inventory of all pharmacy 
    app.get('/inventories', (req, res) => {
        console.log("I AM HERE");
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT p.name AS pharmacyName, m.name AS medName, i.quantity FROM `rapidrx`.`pharmacies` AS p JOIN `rapidrx`.`inventory` AS i ON p.pharmacyID = i.pharmacyID JOIN `rapidrx`.`medications` AS m ON m.medicationID = i.medicationID;', function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching inventory: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        })
                    } else {
                        console.log("ROWS");
                        console.log(rows);
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });


    //user story 9.3 
    //check which inventory is 0
    app.get('/inventories/empty', (req, res) => {
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT p.name AS pharmacyName, m.name AS medName, i.quantity FROM `rapidrx`.`pharmacies` AS p JOIN `rapidrx`.`inventory` AS i ON p.pharmacyID = i.pharmacyID JOIN `rapidrx`.`medications` AS m ON m.medicationID = i.medicationID WHERE quantity = 0;', function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching zero inventory: \n", err);
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

    // Find all pharmacies that have specified medicationID in stock
    app.get('/inventories/hasMedication/:medicationID', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var medicationID = req.params.medicationID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT p.name AS pharmacyName, m.name AS medName, i.quantity FROM  `rapidrx`.`pharmacies` AS p JOIN `rapidrx`.`inventory` AS i ON p.pharmacyID = i.pharmacyID JOIN `rapidrx`.`medications` AS m ON m.medicationID = i.medicationID WHERE i.medicationID = ?', [medicationID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacies: \n", err);
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


    //updating quantities in inventory 
    app.put('/inventories/update', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.body.pharmacyID
                var medicationID = req.body.medicationID
                var quantity = req.body.quantity
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('UPDATE `rapidrx`.`inventory` SET `rapidrx`.`inventory`.`quantity` = ? WHERE `rapidrx`.`inventory`.`pharmacyID` = ? AND `rapidrx`.`inventory`.`medicationID` =?;', [quantity, pharmacyID, medicationID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacies: \n", err);
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


}