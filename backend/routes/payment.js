const pool = require('../db')

module.exports = function payment(app, logger) {

    // GET /payment/:paymentID
    app.get('/payment/:paymentID', (req, res) => {
        console.log(req.params.paymentID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var paymentID = req.params.paymentID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT * FROM `rapidrx`.`payments` AS p WHERE p.paymentID = ?', [paymentID], function (err, rows, fields) {
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

    // POST /payments/create
    // Add a payment
    app.post('/payments/create', (req, res) => {
        console.log(req.body);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var paymentID = req.body.paymentID
                var userID = req.body.userID
                var paymentDate = req.body.paymentDate
                var amount = req.body.amount
                // if there is no issue obtaining a connection, execute query
                connection.query('INSERT INTO `rapidrx`.`payments` (paymentID, userID, paymentDate, amount) VALUES(?, ?, ?, ?)',[paymentID, userID, paymentDate, amount], function (err, rows, fields) {
                    if (err) {
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating payment: \n", err); 
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