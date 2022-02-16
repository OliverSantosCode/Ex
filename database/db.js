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
