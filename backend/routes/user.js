const pool = require('../db')

module.exports = function user(app, logger) {

    // GET /user/:userID
    // app.get('/user/:userID', (req, res) => {
    //     console.log(req.params.userID)
    //     // obtain a connection from our pool of connections
    //     pool.getConnection(function (err, connection){
    //         if(err){
    //             // if there is an issue obtaining a connection, release the connection instance and log the error
    //             logger.error('Problem obtaining MySQL connection',err)
    //             res.status(400).send('Problem obtaining MySQL connection'); 
    //         } else {
    //             var userID = req.params.userID
    //             // if there is no issue obtaining a connection, execute query and release connection
    //             connection.query('SELECT * FROM `rapidrx`.`users` AS u WHERE u.userID = ?', [userID], function (err, rows, fields) {
    //                 // if there is an error with the query, release the connection instance and log the error
    //                 connection.release()
    //                 if (err) {
    //                     logger.error("Error while fetching values: \n", err);
    //                     res.status(400).json({
    //                         "data": [],
    //                         "error": "Error obtaining values"
    //                     })
    //                 } else {
    //                     res.status(200).json({
    //                         "data": rows
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });
    
    // POST /users/create
    app.post('/users/create', (req, res) => {
        console.log(req.body.username,req.body.password, req.body.email, req.body.authorityLevel, req.body.phone);
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

    // POST /login
    app.post('/login', (req, res) => {
        console.log(req.body.username,req.body.password);
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
                connection.query('SELECT userID, username, name, authorityLevel FROM `rapidrx`.`users` WHERE EXISTS(SELECT * FROM `rapidrx`.`users` AS u WHERE u.username = ? AND u.password = ?)', [username, password], function (err, rows, fields) {
                    if (err) { 
                        // if there is an error with the query, release the connection instance and log the error
                        connection.release()
                        logger.error("Error while creating user: \n", err); 

                        res.status(400).json({
                            "data": [],
                            "error": "MySQL error"
                        })
                    } else{
                        console.log(rows)
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });

}