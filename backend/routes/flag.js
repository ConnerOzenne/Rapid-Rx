const pool = require('../db')

module.exports = function flag(app, logger) {

    // GET /flag/:flagID
    app.get('/flag/:flagID', (req, res) => {
        console.log(req.params.flagID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var flagID = req.params.flagID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM flags WHERE flagID = ?', [flagID], function (err, rows, fields) {
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
  
  
    // PUT /flag/:flagType/update
    // update the flagType
    app.put('/flag/:flagType/update', (req, res) => {
        console.log(req.params);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var flagID = req.params.flagID;
                var flagType = req.params.flagType;
                // if there is no issue obtaining a connection, execute query
                connection.query('UPDATE `rapidrx`.`flags` AS n SET n.flagType = ? WHERE n.flagID = ? (flagType, flagID) VALUES(?, ?)',[flagType, flagID], function (err, rows, fields) {
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
  
    // POST /flags/create
    // Create a new flag
    app.post('/flags/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var userID = req.body.userID
                var medicationID = req.body.medicationID
                var flagType = req.body.flagType
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`addresses` (userID, medicationID, flagType, lastUpdated) VALUES(?, ?, ?, now())',[userID, medicationID, flagType], function (err, rows, fields) {
                    if (err) {
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating flag: \n", err); 
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

    // DELETE /flag/:flagID
    app.delete('/flag/:flagID', (req, res) => {
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
                connection.query('DELETE FROM `rapidrx`.`flags` AS f WHERE f.flagID = ?', [flagID], function (err, rows, fields) {
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