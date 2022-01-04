const express = require("express");

const app = express();

app.get('/', function(req, res){
    res.send('GET response to the homepage');
});

app.post('/', function(req, res){
    res.send('POST response to the homepage');
});

app.listen(3000, () => {
    console.log('Running on PORT 3000; press Ctrl+C to terminate...');
});