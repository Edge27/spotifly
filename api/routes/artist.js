'use strict'

var express = require('express');
var ArtistController = require('../controller/artist');
var api = express.Router();
var md_auth = require('../middleware/auntenticate');
var multipart = require('connect-multiparty');
var md_uplaod = multipart({ uploadDir: './uploads/artists' });

api.get('/artist/:id',md_auth.ensureAuth,ArtistController.getArtist);
api.get('/artists/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.post('/artist',md_auth.ensureAuth,ArtistController.saveArtist);
api.put('/artist/:id',md_auth.ensureAuth,ArtistController.updateArtist);
api.delete('/artist/:id',md_auth.ensureAuth,ArtistController.deleteArtist);
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_uplaod], ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile );

module.exports = api;