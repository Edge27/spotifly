'use strict'

var express = require('express');
var SongController = require('../controller/song');
var api = express.Router();
var md_auth = require('../middleware/auntenticate');
var multipart = require('connect-multiparty');
var md_uplaod = multipart({ uploadDir: './uploads/songs' });

api.get('/song/:id',md_auth.ensureAuth,SongController.getSong);
api.get('/songs/:album?',md_auth.ensureAuth,SongController.getSongs);
api.post('/song',md_auth.ensureAuth,SongController.saveSong);
api.put('/song/:id',md_auth.ensureAuth,SongController.updateSong);
api.delete('/song/:id',md_auth.ensureAuth,SongController.deleteSong);
api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_uplaod], SongController.uploadFile);
api.get('/get-file-song/:songFile', SongController.getFile );

module.exports = api;