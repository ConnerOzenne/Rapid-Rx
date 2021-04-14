const pool = require('../db')

module.exports = function address(app, logger) {

    // GET /address/:addressID
    app.get('/address/:addressID', (req, res) => {
        console.log(req.params.addressID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var addressID = req.params.addressID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`addresses` AS a WHERE a.addressID = ?', [addressID], function (err, rows, fields) {
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

    // POST /addresses/create
    //create a new address
    app.post('/addresses/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var address = req.body.street_address
                var city = req.body.city
                var state = req.body.state
                var zipcode = req.body.zipcode
                var country = req.body.country
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`addresses` (address, city, state, zipcode, country) VALUES(?, ?, ?, ?, ?)',[address, city, state, zipcode, country], function (err, rows, fields) {
                    if (err) {
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating address: \n", err); 
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