const express = require('express');
const router = express.Router();
const UrgentController = require('../controllers/urgentController');

// Route pour obtenir toutes les urgences avec pagination
router.get('/', UrgentController.getAllUrgents);

// Route pour ajouter une nouvelle urgence
router.post('/', UrgentController.addUrgent);

// Route pour mettre à jour une urgence existante
router.put('/:id', UrgentController.updateUrgent);

// Route pour supprimer une urgence
router.delete('/:id', UrgentController.deleteUrgent);

module.exports = router;