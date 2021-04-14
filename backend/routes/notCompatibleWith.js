const pool = require('../db')

module.exports = function notCompatibleWith(app, logger) {
    //user story 5.3 see not compatible medication
    // GET /medication/:medicationID/incompatible
    app.get('/medication/:medicationID/incompatible', (req, res) => {
        console.log(req.params.medicationID)
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
            if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
            } else {
                var medicationID= req.params.medicationID
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('select m1.name, m2.name from notCompatibleWith join medications as m1 on m1.medicationID = notCompatibleWith.medicationID_One join medications as m2 on m2.medicationID = notCompatibleWith.medicationID_Two where m1.medicationID =?', [medicationID], function (err, rows, fields) {
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