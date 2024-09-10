const express = require('express');
const router = express.Router();
const PartenaireController = require('../controllers/partenaireController');

// Routes pour les partenaires
router.get('/', PartenaireController.getAllPartenaires); // Obtenir tous les partenaires
router.post('/', PartenaireController.addPartenaire); // Ajouter un partenaire
router.put('/:id', PartenaireController.updatePartenaire); // Mettre à jour un partenaire
router.delete('/:id', PartenaireController.deletePartenaire); // Supprimer un partenaire

module.exports = router;