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

// PostgresSQL
var pg = require('pg');
var conString = 'postgres://username:password@localhost/database';

pg.connect(conString, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        done();
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
    });
});

// Redis
var client = require('redis').createClient();

client.on('error', function(err) {
    console.log('Error ', + err);
});

client.set('string key', 'string val', redis.print);
client.hset('hash key', 'hashtest 1', 'some value', redis.print);
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);

client.hkeys('hash key', function(err, replies) {

    console.log(replies.length + ' replies:');
    replies.forEach(function(reply, i) {
        console.log('   ' + i + ': ' + reply);
    });

    client.quit();

});

// SQLite
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {

    db.run('CREATE TABLE lorem (info TEXT)');
    var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

    for(var i = 0; i < 10; i++) {
        stmt.run('Ipsum ' + i);
    }

    stmt.finalize();

    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
        console.log(row.id + ': ' + row.info);
    });
});

db.close();