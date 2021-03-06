var http = require('http');
const express = require("express");
var routes = require('./routes');
var user = require('./routes/user')
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = ('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

const app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ 
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8 '}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.get('/users', user.list);

app.use('/routes', routes);

// development only
if('development' == app.get('env')) {
    app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});