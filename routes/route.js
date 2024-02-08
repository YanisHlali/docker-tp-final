const express = require('express');
const routeur = express.Router();

const postController = require('../controllers/post.js');
const flagController = require('../controllers/flag.js');
const authentification = require('../controllers/authentification.js');

routeur
.post('/create', postController.createPost)
.get('/', postController.getAllPosts)
.get('/flag', authentification.isAuthenticated, flagController.getFlag)
.get('/login', authentification.loginPage)
.post('/login', authentification.login)
.get('/logout', authentification.logout)


module.exports = routeur;