const pool = require('../db')

module.exports = function pharmacy(app, logger) {

    // GET /pharmacy/:pharmacyID
    //get a pharmacy with ID
    app.get('/pharmacy/:pharmacyID', (req, res) => {
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
                connection.query('SELECT * FROM `rapidrx`.`pharmacies` AS p WHERE p.pharmacyID = ?', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyID: \n", err);
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

//9.1
//view all pharmacy locations 
    app.get('/pharmacies/locations', (req, res) => {

        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
            
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('select name, address, city, state, zipcode, country, pharmacyID from pharmacies join addresses on pharmacies.addressID = addresses.addressID', function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyLocation: \n", err);
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

    // GET /pharmacy/:pharmacyID/inventory
    //get the inventory of a specific pharmacy 
    app.get('/pharmacy/:pharmacyID/inventory', (req, res) => {

        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.params.pharmacyID;
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT pharmacies.name, medications.name, inventory.quantity FROM pharmacies JOIN inventory ON pharmacies.pharmacyID = inventory.pharmacyID JOIN medications ON medications.medicationID = inventory.medicationID WHERE pharmacies.pharmacyID = ?', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyID inventory: \n", err);
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

    //9,2 
    //view inventory of all pharmacy location 
    app.get('/pharmacies/inventory', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
            
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('select pharmacies.name, medications.name,inventory.quantity from pharmacies join inventory on pharmacies.pharmacyID = inventory.pharmacyID join medications on medications.medicationID = inventory.medicationID', function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching inventories: \n", err);
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

    //9.4
    //see which pharmacy is out of stock for a certain med
    app.get('/pharmacy/pharmacMedicationZero', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
            
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('select pharmacies.name, medications.name, inventory.quantity from pharmacies join inventory on pharmacies.pharmacyID = inventory.pharmacyID join medications on medications.medicationID = inventory.medicationID where quantity =0;', function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyMedicationZero: \n", err);
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

    // GET /pharmacy/:pharmacyID/employees
    app.get('/pharmacy/:pharmacyID/employees', (req, res ) => {
        console.log(req.params.pharmacyID)
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.params.pharmacyID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`users` AS u WHERE u.pharmacyID = ? && u.authorityLevel = 1', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyID employees: \n", err);
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

    //user story 3.1, 3.2 get orders from certain pharmacy
    //also satisfies 4.4
    app.get('/pharmacy/:pharmacyID/perscriptions', (req, res ) => {
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.params.pharmacyID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT `rapidrx`.`pharmacies`.`name`, `rapidrx`.`medications`.`name`, `rapidrx`.`orderDetails`.`quantity`, `rapidrx`.`orders`.`dateOrdered`,`rapidrx`.`orderDetails`.`refillDate` FROM `rapidrx`.`orders` JOIN `rapidrx`.`orderDetails` ON `rapidrx`.`orders`.`orderID` = `rapidrx`.`orderDetails`.`orderID` JOIN `rapidrx`.`pharmacies` ON `rapidrx`.`orders`.`pharmacyID` = `rapidrx`.`pharmacies`.`pharmacyID` JOIN `rapidrx`.`medications` ON `rapidrx`.`orderDetails`.`medicationID` = `rapidrx`.`medications`.`medicationID` WHERE `rapidrx`.`pharmacies`.`pharmacyID` =?; ', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyID customers: \n", err);
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




    app.get('/pharmacy/:pharmacyID/customers', (req, res ) => {
        console.log(req.params.pharmacyID)
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.params.pharmacyID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`users` AS u WHERE u.pharmacyID = ? && u.authorityLevel = 0', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyID customers: \n", err);
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

    // GET /pharmacy/:pharmacyID/manager
    app.get('/pharmacy/:pharmacyID/manager', (req, res ) => {
        console.log(req.params.pharmacyID)
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.params.pharmacyID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`users` AS u WHERE u.pharmacyID = ? && u.authorityLevel = 2', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyID manager: \n", err);
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