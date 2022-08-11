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
function saveAlbum(req, res) {
    var album = new Album();
    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({ message: "ERROR en el servidor" });
        } else {
            if (!albumStored) {
                res.status(404).send({ message: "ERROR al guardar album" });
            } else {
                res.status(200).send({ album: albumStored })
            }
        }
    });
}

function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al  actualizar el Album' });
        } else {
            if (!albumUpdate) {
                res.status(404).send({ message: 'El Album no se ha actualizado' });
            } else {
                res.status(200).send({ album: albumUpdate });
            }
        }
    });
}

function getAlbums(req, res) {
    var page = req.params.page ? req.params.page : 1;
    var itemsPerPage = 12;
    Album.find().sort('name').paginate(page, itemsPerPage, function (err, albums, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!albums) {
                res.status(404).send({ message: 'No hay Albums !!' });
            } else {
                res.status(200).send({ totalItems: total, artists: albums });
            }
        }
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum

}