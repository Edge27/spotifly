'use strcit'

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
var mongoosePaginate = require('mongoose-pagination');
const artist = require('../models/artist');


function getSong(req, res) {
    var songId = req.params.id;
    Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {
        if (err) {
            res.status(500).send({ message: 'Error de servidor' });
        } else {
            if (!song) {
                res.status(404).send({ message: 'Error no se encuentra' });
            } else {
                res.status(200).send({ song });
            }
        }
    });
}

function saveSong(req, res) {
    var song = new Song();
    var params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;
    song.save((err, songStored) => {
        if (err) {
            res.status(500).send({ message: 'error en servidor ' });
        } else {
            if (!songStored) {
                res.status(404).send({ message: 'error en guardar cancion ' });
            } else {
                res.status(200).send({ songStored });
            }

        }
    });
}
function getSongs(req, res) {
    var albumId = req.params.album;

    if (!albumId) {
        var find = Song.find({}).sort('number');
    }
    else {
        var find = Song.find({ album: albumId }).sort('number');
    }
    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec(function (err, songs) {
        if (err) {
            res.status(500).send({ message: 'error en servidor ' });
        } else {
            if (!songs) {
                res.status(404).send({ message: 'error sin canciones' });
            } else {
                res.status(200).send({ songs });
            }
        }
    });
}

function updateSong(req, res) {
    var songId = req.params.id;
    var update = req.body;
    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            res.status(500).send({ message: 'error en servidor 83' });
        } else {
            if (!songUpdated) {
                res.status(404).send({ message: 'error en servidor 86' });
            } else {
                res.status(200).send({ songUpdated });
            }
        }
    })

}


function deleteSong(req, res) {
    var songId = req.params.id;

    Song.findByIdAndDelete(songId, (err,songDeleted)=>{
        if (err) {
            res.status(500).send({ message: 'Error al  eliminar la cacncion' });
        } else {
            if (!songDeleted) {
                res.status(404).send({ message: 'La canción no se ha eliminado' });
            } else {
                res.status(200).send({ songDeleted });
            }
        }
    })
}


function uploadFile(req, res) {
    var songID = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'mp3' || file_ext == 'ogg' ) {
            Song.findByIdAndUpdate(songID, { file: file_name }, (err, songUpdate) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar el usuario'
                    });
                } else {
                    if (!songUpdate) {
                        res.status(404).send({
                            message: 'No se ha podido actualizar el usuario'
                        });
                    } else {
                        res.status(200).send({
                            song: songUpdate
                        });
                    }
                }
            });

        }

    } else {
        res.status(200).send({ message: "No has subido ninguna imagen..." });
    }

}

function getFile(req, res) {
    var songFile = req.params.songFile;
    var path_file = './uploads/songs/' + songFile;
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
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getFile
}
