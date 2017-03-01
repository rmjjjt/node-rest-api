// Base setup

// Call the packages we need

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  //set port

// ROUTES FOR API

var router = express.Router();

// test route to make sure it is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! Welcome to the api!' })
});

// more API routes here

//REGISTER ROUTES
// all routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);