'use strcit'

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
var mongoosePaginate = require('mongoose-pagination');

function getArtist(req, res) {
    var artistId = req.params.id;
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({ message: "Metodo getArtist del contolador artist js" });
        } else {
            if (!artist) {
                res.status(404).send({ message: "El artista no existe" });
            } else {
                res.status(200).send({ artist });
            }

        }
    })

}

function getArtists(req, res) {
    var page = req.params.page ? req.params.page : 1;
    var itemsPerPage = 12;
    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!artists) {
                res.status(404).send({ message: 'No hay artistas !!' });
            } else {

                res.status(200).send({ totalItems: total, artists: artists });
            }

        }
    });


}

function saveArtist(req, res) {

    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';
    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al  guardar el artista' });
        } else {
            if (!artistStored) {
                res.status(404).send({ message: 'El artista no se ha guardado' });
            } else {
                res.status(200).send({ artist: artistStored });
            }
        }
    })

}

function updateArtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al  actualizar el artista' });
        } else {
            if (!artistUpdate) {
                res.status(404).send({ message: 'El artista no se ha actualizado' });
            } else {
                res.status(200).send({ artist: artistUpdate });
            }
        }
    });
}

function deleteArtist(req, res) {
    var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al  borrar el artista' });
        } else {
            if (!artistRemoved) {
                res.status(404).send({ message: 'El artista no se ha eliminado' });
            } else {
                Album.find({ artist: artistRemoved._id }).remove((err, albumRemoved) => {
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
                                        res.status(200).send({ artistRemoved });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}


function uploadImage(req, res) {
    var artistId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Artist.findOneAndUpdate(artistId, { image: file_name }, (err, artistUpdate) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar el usuario'
                    });
                } else {
                    if (!artistUpdate) {
                        res.status(404).send({
                            message: 'No se ha podido actualizar el usuario'
                        });
                    } else {
                        res.status(200).send({
                            user: artistUpdate
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
    var path_file = './uploads/artists/' + imageFile;
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
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}