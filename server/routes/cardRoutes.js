// routes/cardRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCards } = require('../controllers/cardController');

// Route pour récupérer tous les documents de la collection 'card'
router.get('/', getAllCards);

module.exports = router;