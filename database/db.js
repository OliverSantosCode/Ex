var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['localhost']});

client.execute('select key from system.local', function(err, result) {
    if(err) throw err;
    console.log(result.rows[0]);
});

// CouchDB
var nano = require('nano')('http://localhost:5984');
nano.db.create('books');
var books = nano.db.use('books');

//Insert a book document in the books database
books.insert({name: 'The Art od war'}, null, function(err, body) {
    if(!err){
        console.log(body);
    }
});

// Get a list of all books
books.list(function(err, body) {
    console.log(body.rows);
});

// LevelDB
var levelup = require('levelup');
var db = levelup('./mydb');

db.put('name', 'LevelUP', function(err) {

    if(err) return console.log('Ops!', err);
    db.get('name', function(err, value) {
        if(err) return console.log('Ooops!', err);
        console.log('name= ' + value);
    });
});

// MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'dbuser',
    password    : 's3kreee7'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if(err) throw err;
    console.log('There solution is: ', rows[0].solution);
});

connection.end();

// MongoDB
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/animals', function(err, result) {
    if(err) {
        throw err;
    }
    db.collection('animals').find().toArray(function(err, result) {
        if(err) {
            throw err;
        }
        console.log(result);
    });
});

// Neo4j
var apoc = require('apoc');

apoc.query('match (n) return n').exec().then(
    function(res) {
        console.log(res);
    },
    function(fail) {
        console.log(fail);
    }
);