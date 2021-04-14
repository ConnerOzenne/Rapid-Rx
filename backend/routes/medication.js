const pool = require('../db')

module.exports = function medication(app, logger) {

    // GET /medication/:medicationID
    app.get('/medication/:medicationID', (req, res) => {
        console.log(req.params.medicationID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var medicationID = req.params.medicationID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`medications` AS m WHERE m.medicationID = ?', [medicationID], function (err, rows, fields) {
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

    // GET /medications - RETURNS ALL MEDICATIONS
    app.get('/medications', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`medications`', function (err, rows, fields) {
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


    //edit a specific medication profile
    //user story 6.2
    app.put('/medications/:medicationID', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                var medicationID = req.params.medicationID
                var name = req.body.name
                var sideEffects = req.body.sideEffects
                var treats = req.body.treats
                var description = req.body.description
                var price = req.body.price
                var flag = req.body.flag
                connection.query('update medications set name = ?, sideEffects =?, treats=?,description =?, price = ?, flag =? where medicationID =?;', [name,sideEffects,treats,description,price,flag,medicationID],function (err, rows, fields) {
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

    // POST /medications/create
    // add a new medication to database
    app.post('/medications/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var name = req.body.name
                var sideEffects = req.body.sideEffects
                var usedFor = req.body.usedFor
                var description = req.body.description
                var price = req.body.price
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`medications` (name, sideEffects, usedFor, description, price) VALUES(?, ?, ?, ?, ?)',[name, sideEffects, usedFor, description, price], function (err, rows, fields) {
                    if (err) {
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating appointment: \n", err); 
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

}