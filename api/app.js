'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes =  require('./routes/user');
var artist_routes =  require('./routes/artist');
var album_routes =  require('./routes/album');
var song_routes =  require('./routes/song');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST , OPTIONS , PUT, DELETED');
    res.header('Allow', 'GET, POST , OPTIONS , PUT, DELETED');
    next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);

//app.get('/pruebas', function (req, res) {
//    res.status(200).send("Bienvenido al curso de JS");
//});
module.exports = app;
