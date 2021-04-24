const pool = require('../db')

module.exports = function order(app, logger) {

    // GET /order/:orderID
    app.get('/order/:orderID', (req, res) => {
        console.log(req.params.orderID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var orderID = req.params.orderID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`orders` AS o WHERE o.orderID = ?', [orderID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching orderID: \n", err);
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

    // GET /orders
    app.get('/orders', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`orders`', function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching orders: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        });
                    } else {
                        res.status(200).json(rows);
                    }
                });
            }
        });
    });

    // GET /order/:orderID/details
    app.get('/order/:orderID/details', (req, res) => {
        console.log(req.params.orderID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var orderID = req.params.orderID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`orderDetails` AS o WHERE o.orderID = ?', [orderID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching order details: \n", err);
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

    // GET /orders/user/:userID (1.2)
    app.get('/orders/user/:userID', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`orders` AS o WHERE o.userID = ?', [userID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching userID orders: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        });
                    } else {
                        res.status(200).json(rows);
                    }
                });
            }
        });
    });

    // GET /orders/:pharmacyID
    app.get('/orders/pharmacy/:pharmacyID', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`orders` AS o JOIN `rapidrx`.`orderDetails` AS od WHERE o.pharmacyID = ?', [pharmacyID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching pharmacyID orders: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        });
                    } else {
                        res.status(200).json(rows);
                    }
                });
            }
        });
    });
                      
    // POST /orders/create
    // Create a new order
    app.post('/orders/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.body.userID
                var pharmacyID  = req.body.pharmacyID
                var dateOrdered = req.body.dateOrdered
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`orders` (userID, pharmacyID, dateOrdered) VALUES(?, ?, ?)',[userID, pharmacyID, dateOrdered], function (err, rows, fields) {
                    if (err) {
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating order: \n", err); 
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

    // POST /orders/details/create
    // Add details to an order
    app.post('/orders/details/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var orderID = req.body.orderID
                var medicationID  = req.body.medicationID
                var quantity   = req.body.quantity
                var refillDate = req.body.refillDate
                var refillLeft  = req.body.refillLeft
                var totalCost   = req.body.totalCost 
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`orderDetails` (orderID, medicationID, quantity, refillDate, refillLeft, totalCost) VALUES(?, ?, ?, ?, ?, ?)',[orderID, medicationID, quantity, refillDate, refillLeft, totalCost], function (err, rows, fields) {
                    if (err) {
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating order details: \n", err); 
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