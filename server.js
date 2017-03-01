// Base setup

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/bears'); // connect to our database

// Call the packages we need

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./app/models/bear');

// configure app to use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  //set port

// ROUTES FOR API

var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening!');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure it is working
router.get('/', function(req, res) {
    res.json({ message: 'Hooray! Welcome to the api!' })
});

// more API routes here

// on routes that end in /bears
router.route('/bears')

    // create a bear /api/bears POST
    .post(function(req, res) {

        var bear = new Bear(); // create a new instance of Bear model
        bear.name = req.body.name; // set the bear's name (from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if(err)
                res.send(err);

            res.json({ message: 'Bear created'});
        });

    });

//REGISTER ROUTES
// all routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);