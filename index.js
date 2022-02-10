const express = require("express");
var routes = require('./routes');
var http = require('http');
var path = require('path');

const app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here '}));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.use('/routes', routes);

http.createServer(app).listen(app.get('port'), () => {
    console.log('Running on PORT: ' + app.get('port') + '; press Ctrl+C to terminate...');
});