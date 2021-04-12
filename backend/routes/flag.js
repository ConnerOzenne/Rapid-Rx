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

}