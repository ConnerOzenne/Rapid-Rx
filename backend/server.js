require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
// const mysqlConnect = require('./db');

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//include routes

const address = require('./routes/address');
const appointment = require('./routes/appointment');
const flag = require('./routes/flag');
const inventory = require('./routes/inventory');
const medication = require('./routes/medication');
const notCompatibleWith  = require('./routes/notCompatibleWith');
const notification = require('./routes/notification');
const order = require('./routes/order');
const payment = require('./routes/payment');
const pharmacy = require('./routes/pharmacy');
const request = require('./routes/request');
const user = require('./routes/user');

address(app, logger);
appointment(app, logger);
flag(app, logger);
inventory(app, logger);
medication(app, logger);
notCompatibleWith(app, logger);
notification(app, logger);
order(app, logger);
payment(app, logger);
pharmacy(app, logger);
request(app, logger);
user(app, logger);

// GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
