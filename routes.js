var express = require('express');
var router = express.Router();

router.use(function timelog(req, res, next) {
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