const express = require("express");

const app = express();

var router = require('./routes');

app.get('/', function(req, res){
    res.send('GET response to the homepage');
});

app.get(/z/, function(req, res) {
    res.send('/z/');
});

app.get('/next', function(req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function(req, res) {
    res.send('Hello from next');
});

var cb0 = function(req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function(req, res, next) {
    console.log('CB1');
    next();
}

var cb2 = function(req, res) {
    res.send('Hello from C2!');
}

app.get('/matrix', [cb0, cb1, cb2]);

app.post('/', function(req, res){
    res.send('POST response to the homepage');
});

app.get('/matrixx', [cb0, cb1], function(req, res, next) {
    console.log('the response will be sent the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from Matrix 2!')
});

app.all('/secret', function(req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});

app.use('/routes', router);

app.listen(3000, () => {
    console.log('Running on PORT 3000; press Ctrl+C to terminate...');
});