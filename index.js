const express = require("express");

const app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = require('./routes');

var myLogger = function(req, res, next) {
    console.log('LOGGED');
    next();
}

var requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
}

app.set('views', './views');
app.set('view engine', 'pug');

app.use(myLogger);
app.use(requestTime);

app.use('/user/:id', function(req, res, next) {
    console.log('Request Type: ', req.method);
    next();
});

app.get('/user/:id', function(req, res, next) {
    res.send('USER');
});

app.use('/users/:id', function(req, res, next) {
    console.log('ID: ', req.params.id);
    next();
}, function(req, res, next) {
    res.send('User Info');
});

app.get('/users/:id', function(req, res, next) {
    res.end(req.params.id);
});

app.get('/', function(req, res){
    res.send('GET response to the homepage ' + 'Request at: ' + req.requestTime);
});

app.get('/pug', function(req, res) {
    res.render('index', { title: 'Express with Pug', message: 'Hello there!' });
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

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke');
});

app.listen(3000, () => {
    console.log('Running on PORT 3000; press Ctrl+C to terminate...');
});