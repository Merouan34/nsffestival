// routes/planning.js

const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planningController');

// Récupérer tous les plannings
router.get('/', planningController.getAllPlanning);

router.post('/', planningController.createPlanning);

// Mettre à jour un planning d'artiste par nom d'artiste
router.put('/:nomArtist', planningController.updatePlanning);

// Supprimer un planning d'artiste par nom d'artiste
router.delete('/:nomArtist', planningController.deletePlanning);

module.exports = router;
