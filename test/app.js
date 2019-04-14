const express = require('express');
const APIRouting = require('./lib/APIRouting');
const mysql = require('mysql');
const app = express();

let pool = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'khjldb',
    username:'root',
    password:'12345678'
});

APIRouting.store({mysql,pool});
app.use(APIRouting.static(__dirname,'./api'));

app.listen(8088, () => {
    console.log('Example app listening on port 8088!');
});

//Run app, then load http://localhost:8088 in a browser to see the output.
