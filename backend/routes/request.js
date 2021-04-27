const pool = require('../db')

module.exports = function request(app, logger) {

    // GET /request/:requestID
    //get the request with requestID
    app.get('/request/:requestID', (req, res) => {
        console.log(req.params.requestID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var requestID = req.params.requestID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`requests` AS r WHERE r.requestID = ?', [requestID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching requests: \n", err);
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

    // GET /request/pendingDest
    // retrieve pending requests (incomplete) for a given pharmacyID_dest
    app.get('/request/:pharmacyID_dest/pendingDest', (req, res) => {
        console.log(req.params.pharmacyID_dest)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID_dest = req.params.pharmacyID_dest
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`requests` AS a WHERE a.isComplete = 0 AND a.pharmacyID_dest = ?', [pharmacyID_dest], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pending requests for pharmacyID_dest: \n", err);
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

    // GET /request/pendingSource
    // retrieve pending requests (incomplete) for a given pharmacyID_source
    app.get('/request/:pharmacyID_source/pendingSource', (req, res) => {
        console.log(req.params.pharmacyID_source)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID_source = req.params.pharmacyID_source
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`requests` AS a WHERE a.isComplete = 0 AND a.pharmacyID_source = ?', [pharmacyID_source], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pending requests for pharmacyID_source: \n", err);
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

    app.post('/request/transfer', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID_source = req.body.pharmacyID_source;
                var pharmacyID_dest = req.body.pharmacyID_dest;
                var medicationID = req.body.medicationID;
                var quantity = req.body.quantity;
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('CALL transfer(?,?,?,?);', [pharmacyID_source, pharmacyID_dest, medicationID, quantity], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching requests: \n", err);
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

    // POST /requests/create
    // Add a request
    app.post('/requests/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var requestID = req.body.requestID
                var pharmacyID_source = req.body.pharmacyID_source
                var pharmacyID_dest = req.body.pharmacyID_dest
                var medicationID = req.body.medicationID
                var quantity = req.body.quantity
                var date_requested = req.body.date_requested
                var isComplete = req.body.isComplete
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`requests` (requestID, pharmacyID_source, pharmacyID_dest, medicationID, quantity, date_requested, isComplete) VALUES(?, ?, ?, ?, ?, ?, 0)',[requestID, pharmacyID_source, pharmacyID_dest, medicationID, quantity, date_requested, isComplete], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while creating request: \n", err); 
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

    // PUT /request/:requestID/updateQuantity
    // Add / change quantity of medication in a request
    app.put('/request/:requestID/updateQuantity', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var requestID = req.params.requestID;
                var quantity = req.body.quantity;
                // if there is no issue obtaining a connection, execute query
                connection.query('UPDATE `rapidrx`.`requests` AS r SET r.quantity = ? WHERE r.requestID = ?;', [quantity, requestID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) { 
                        logger.error("Error while updating request: \n", err); 
                        res.status(400).json({
                            "error": "MySQL error"
                        })
                    } else {
                        res.status(200).json(rows)
                    }
                });
            }
        });
    });

    // PUT /request/:requestID/setComplete
    app.put('/request/:quantity/setComplete', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var requestID = req.params.requestID;
                // if there is no issue obtaining a connection, execute query
                connection.query('UPDATE `rapidrx`.`requests` AS r SET r.isComplete = 1 WHERE r.requestID = ?', [requestID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) { 
                        logger.error("Error while updating request: \n", err); 
                        res.status(400).json({
                            "error": "MySQL error"
                        })
                    } else {
                        res.status(200).json(rows)
                    }
                });
            }
        });
    });

}