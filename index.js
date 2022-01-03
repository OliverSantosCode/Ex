const express = require("express");

const app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Running on PORT 3000; press Ctrl+C to terminate...');
});