// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// [SH] Require Passport
var passport = require('passport');
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./docs/swagger.json');

var env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];


// Get our API routes
const api = require('./server/routes/api');
// Get our API routes
const privateapi = require('./server/routes/privateapi');

const app = express();

// [SH] Bring in the Passport config after model is defined
require('./server/config/passport');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function applyXFrame(req,res,next){
	res.set('X-Frame-Options','DENY');
	next();
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Set our api routes
app.use('/api', api);

app.use('/api/privateapi', privateapi);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log('calling angular app');
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || config.server.port;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
