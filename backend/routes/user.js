const pool = require('../db')

module.exports = function user(app, logger) {

    // GET /user/:userID
    //get a user with userID 
    app.get('/user/:userID', (req, res) => {
        console.log(req.params.userID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.params.userID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`users` AS u WHERE u.userID = ?', [userID], function (err, rows, fields) {
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
    
    // POST /users/create
    //create a new user 
    app.post('/users/create', (req, res) => {
        console.log(req.body.username, req.body.password, req.body.email, req.body.authorityLevel, req.body.name, req.body.phone);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var name = req.body.name
                var username = req.body.username
                var password = req.body.password
                var email = req.body.email
                var phone = req.body.phone
                var authorityLevel = req.body.authorityLevel
                if (authorityLevel < 0 || authorityLevel > 1) {
                    authorityLevel = 0;
                }
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`users` (name, username, password, email, authorityLevel, phone) VALUES(?, ?, ?, ?, ?, ?)',[name, username, password, email, authorityLevel, phone], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating user: \n", err); 
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

    // post /login
    //login function
    app.post('/login', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var username = req.body.username
                var password = req.body.password
                // if there is no issue obtaining a connection, execute query
                connection.query('SELECT IF(EXISTS(SELECT * FROM `rapidrx`.`users` AS u WHERE u.username = ? AND u.password = ?), 1, 0) AS loginSuccess,\
                IF((EXISTS(SELECT userID FROM `rapidrx`.`users` AS u WHERE u.username = ? AND u.password = ?)), (SELECT userID FROM `rapidrx`.`users` AS u WHERE u.username = ?), null) AS userID,\
                IF((EXISTS(SELECT username FROM `rapidrx`.`users` AS u WHERE u.username = ? AND u.password = ?)), (SELECT username FROM `rapidrx`.`users` AS u WHERE u.username = ?), null) AS username,\
                IF((EXISTS(SELECT userID FROM `rapidrx`.`users` AS u WHERE u.username = ? AND u.password = ?)), (SELECT name FROM `rapidrx`.`users` AS u WHERE u.username = ?), null) AS name,\
                IF((EXISTS(SELECT userID FROM `rapidrx`.`users` AS u WHERE u.username = ? AND u.password = ?)), (SELECT authorityLevel FROM `rapidrx`.`users` AS u WHERE u.username = ?), null) AS authorityLevel;',
                [username, password, username, password, username, username, password, username, username, password, username, username, password, username], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error loggin in user: \n", err); 

                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error",
                            "response" : false
                        })
                    } else{
                        res.status(200).json({
                            "data": rows,
                            "response": rows[0].loginSuccess
                        });
                    }
                });
            }
        });
    });

//user story 7.3
//i want to see the prescription that my doctor has written for me
    app.get('/user/:userID/medications', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query
                var userID = req.params.userID
                connection.query('SELECT u.name AS userName, m.name as medName, p.name as pharmacyName, od.refillDate, od.quantity, od.totalCost from `rapidrx`.`users` AS u JOIN `rapidrx`.`orders` AS o on u.userID = o.userID JOIN `rapidrx`.`orderDetails` AS od ON o.orderID = od.orderID JOIN `rapidrx`.`medications` AS m ON m.medicationID = od.medicationID JOIN `rapidrx`.`pharmacies` AS p ON o.pharmacyID = p.pharmacyID WHERE u.userID = ?;', [userID], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating user: \n", err); 
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

    // GET /users
    //get all users
    app.get('/users', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT userID, username, email, name, pharmacyID, addressID, authorityLevel, phone FROM `rapidrx`.`users`', function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        })
                    } else {
                        res.status(200).json(rows);
                    }
                });
            }
        });
    });

    // GET /users/managers
    app.get('/users/managers', (req, res) => {
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var pharmacyID = req.params.pharmacyID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`users` AS u WHERE u.authorityLevel = 2', function (err, rows, fields) {
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

    // GET /user/:userID/orders
    //get a user's order
    app.get('/user/:userID/orders', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.params.userID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`orders` AS o WHERE o.userID = ?', [userID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        });
                    } else {
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });


    app.get('/user/:userID/orders', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.params.userID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`orders` AS o WHERE o.userID = ?', [userID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        });
                    } else {
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });


//update addresses
app.put('/user/:userID/addresses', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
        if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
            var userID = req.params.userID
            var address = req.body.address
            var city = req.body.city
            var state = req.body.state
            var zipcode = req.body.zipcode
            var country = req.body.country 

            // if there is no issue obtaining a connection, execute query and release connection
            connection.query('update addresses join users on users.addressID = addresses.addressID set users.addressID = addresses.addressID, address =?, city = ?, state = ?, zipcode =?,country =? where userID = ?;', [address,city,state,zipcode,country,userID], function (err, rows, fields) {
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                if (err) {
                    logger.error("Error while fetching values: \n", err);
                    res.status(400).json({
                        "data": [],
                        "error": "Error obtaining values"
                    });
                } else {
                    res.status(200).json({
                        "data": rows
                    });
                }
            });
        }
    });
});

    //user story 10.3
    //edit user profile
    app.put('/user/:userID', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.params.userID
                var username = req.body.username
                var email = req.body.email
                var name = req.body.name
                var phone = req.body.phone 
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('UPDATE `rapidrx`.`users` AS u SET u.username = ?, u.email = ?, u.name = ?, u.phone = ? WHERE u.userID = ?;', [username, email, name, phone, userID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        });
                    } else {
                        res.status(200).json(rows)
                    }
                });
            }
        });
    });

    // PUT /user/:userID/password
    // Update a user's password
    app.put('/user/:userID/password', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.params.userID
                var password = req.body.password
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('UPDATE `rapidrx`.`users` AS u SET u.password = ? WHERE u.userID = ?;', [password, userID], function (err, rows, fields) {
                    // if there is an error with the query, release the connection instance and log the error
                    connection.release()
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        });
                    } else {
                        res.status(200).json(rows)
                    }
                });
            }
        });
    });

    // DELETE /user/:userID
    app.delete('/user/:userID', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.params.userID;
                // if there is no issue obtaining a connection, execute query
                connection.query('DELETE FROM `rapidrx`.`users` AS u WHERE u.userID = ?',[userID], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating user: \n", err); 
                        res.status(400).json({
                            "error": "MySQL error"
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

    // See all appointments for a user
    app.get('/user/:userID/appointments', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query
                var userID = req.params.userID
                connection.query('SELECT * FROM `rapidrx`.`appointments` AS a WHERE a.customerID = ?', [userID], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while getting appointments: \n", err); 
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
