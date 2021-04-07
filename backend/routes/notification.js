const pool = require('../db')

module.exports = function notification(app, logger) {

    // GET /notification/:notificationID
    app.get('/notification/:notificationID', (req, res) => {
        console.log(req.params.notificationID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var notificationID = req.params.notificationID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`notifications` AS n WHERE n.notificationID = ?', [notificationID], function (err, rows, fields) {
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

    // POST /notifications/create
    app.post('/notifications/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.body.userID
                var message = req.body.message
                var date = req.body.date
                var authorityLevel = req.body.authorityLevel
                if (authorityLevel < 0 || authorityLevel > 1) {
                    authorityLevel = 0;
                }
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`notifications` (userID, message, date, authorityLevel, seen) VALUES(?, ?, ?, ?, 0)',[userID, message, date, authorityLevel], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating user: \n", err); 
                        res.status(400).json({
                            "data": [],
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

    // PUT /notification/:notificationID/seen
    app.put('/notification/:notificationID/seen', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var notificationID = req.params.notificationID;
                // if there is no issue obtaining a connection, execute query
                connection.query('UPDATE `rapidrx`.`notifications` AS n SET seen = 1 WHERE n.notificationID = ?',[notificationID], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating user: \n", err); 
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

    // DELETE /notification/:notificationID
    app.delete('/notification/:notificationID', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var notificationID = req.params.notificationID;
                // if there is no issue obtaining a connection, execute query
                connection.query('DELETE FROM `rapidrx`.`notifications` AS n WHERE n.notificationID = ?',[notificationID], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating user: \n", err); 
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