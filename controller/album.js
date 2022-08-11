'use strcit'

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
var mongoosePaginate = require('mongoose-pagination');

function getAlbum(req, res) {
    var albumId = req.params.id;
    Album.findById(albumId, (err, album) => {
        if (err) {
            res.status(500).send({ message: "Metodo getAlbum del contolador artist js" });
        } else {
            if (!album) {
                res.status(404).send({ message: "El Album no existe" });
            } else {
                res.status(200).send({ album });
            }

        }
    })

}
function saveAlbum(req,res){
    var album = new Album();
    var params =req.body;
    album.title=params.title;
    album.description=params.description;
    album.year=params.year;
    album.image='null';
    album.artist=params.artist;

    album.save((err,albumStorred)=>);
    

}

module.exports = {
    getAlbum,
    saveAlbum
}