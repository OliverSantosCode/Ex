var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var router = express.Router();

const options = {
    dotFiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function(res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
}

var myLogger = function(req, res, next) {
    console.log('LOGGED');
    next();
}

var requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
}

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if(req.xhr) {
        res.status(500).send({ error: 'Something failed'});
    }else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
}

router.use(myLogger);
router.use(requestTime);

router.use('/user/:id', function(req, res, next) {
    console.log('Request Type: ', req.method);
    next();
});

router.get('/user/:id', function(req, res, next) {
    res.send('USER');
});

router.use('/users/:id', function(req, res, next) {
    console.log('ID: ', req.params.id);
    next();
}, function(req, res, next) {
    res.send('User Info');
});

router.get('/users/:id', function(req, res, next) {
    res.end(req.params.id);
});

router.get('/', function(req, res){
    res.send('GET response to the homepage ' + 'Request at: ' + req.requestTime);
});

router.get('/pug', function(req, res) {
    res.render('index', { title: 'Express with Pug', message: 'Hello there!', text: 'Testing the Pug '});
});

router.get(/z/, function(req, res) {
    res.send('/z/');
});

router.get('/next', function(req, res, next) {
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

router.get('/matrix', [cb0, cb1, cb2]);

router.post('/', function(req, res){
    res.send('POST response to the homepage');
});

router.get('/matrixx', [cb0, cb1], function(req, res, next) {
    console.log('the response will be sent the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from Matrix 2!')
});

router.all('/secret', function(req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});

router.use(bodyParser());
router.use(methodOverride());
router.use(logErrors);
router.use(clientErrorHandler);
router.use(errorHandler);
router.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke');
});

router.use(express.static('public', options));

router.use(cookieParser());

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('Birds home page');
});

router.get('/about', function(req, res) {
    res.send('About birds');
});

router.route('/book')
.get(function(req, res) {
    res.send('Get a random book');
})
.post(function(req, res) {
    res.send('Add a book');
})
.put(function(req, res) {
    res.send('Update the book');
});

router.use('/users/:id', function(req, res, next) {
    console.log('Request URL: ', req.originalUrl);
    next();
}, function(req, res, next) {
    console.log('Request Type: ', req.method);
    next();
});

router.get('/username/:id', function(req, res, next) {

    if(req.params.id == 0) next('route');

    else next();
}, function(req, res, next) {
    res.render('regular');
});

router.get('/username/:id', function(req, res, next) {
    res.render('special');
});

module.exports = router;