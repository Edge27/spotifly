'use strict'

var express = require('express');
var AlbumController = require('../controller/album');
var api = express.Router();
var md_auth = require('../middleware/auntenticate');
var multipart = require('connect-multiparty');
var md_uplaod = multipart({ uploadDir: './uploads/albums' });

api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum);
api.get('/albums/:page?',md_auth.ensureAuth,AlbumController.getAlbums);
api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);
api.put('/album/:id',md_auth.ensureAuth,AlbumController.updateAlbum);
// api.delete('/album/:id',md_auth.ensureAuth,AlbumController.deleteArtist);
// api.post('/upload-image-album/:id', [md_auth.ensureAuth, md_uplaod], AlbumController.uploadImage);
// api.get('/get-image-album/:imageFile', AlbumController.getImageFile );

module.exports = api;