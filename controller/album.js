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

function deleteAlbum(req, res) {
    var albumtId = req.params.id;
    Album.findByIdAndRemove(albumtId, ((err, albumRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al  eliminar el album' });
        } else {
            if (!albumRemoved) {
                res.status(404).send({ message: 'El album no se ha eliminado' });
            } else {
                Song.find({ album: albumRemoved._id }).remove((err, songRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al  eliminar la cacncion' });
                    } else {
                        if (!songRemoved) {
                            res.status(404).send({ message: 'La canción no se ha eliminado' });
                        } else {
                            res.status(200).send({ albumRemoved });
                        }
                    }
                });
            }
        }
    }));
}


function uploadImage(req, res) {
    var albumID = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Album.findOneAndUpdate(albumID, { image: file_name }, (err, albumUpdate) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar el usuario'
                    });
                } else {
                    if (!albumUpdate) {
                        res.status(404).send({
                            message: 'No se ha podido actualizar el usuario'
                        });
                    } else {
                        res.status(200).send({
                            user: albumUpdate
                        });
                    }
                }
            });

        }

    } else {
        res.status(200).send({ message: "No has subido ninguna imagen..." });
    }

}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));

        } else {
            res.status(200).send({
                message: 'No existe la imagen'
            });
        }
    });

}
module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    deleteAlbum,
    updateAlbum,
    getImageFile,
    uploadImage
}