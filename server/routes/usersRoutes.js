// routes/UserRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

// Route pour l'enregistrement d'un utilisateur
router.post('/register', UserController.registerUser);

// Route pour la connexion d'un utilisateur
router.post('/login', UserController.loginUser);

module.exports = router;
