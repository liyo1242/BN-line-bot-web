var express = require('express');
var path = require('path');

var app = express();
app.use(express.static('styles'));
app.use(express.static(__dirname));

var port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening on ${port}`);
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index1.html'));
})