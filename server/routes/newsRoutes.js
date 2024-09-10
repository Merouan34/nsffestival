const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController'); // Assurez-vous que le chemin du fichier est correct

// Route pour récupérer toutes les nouveautés avec pagination
router.get('/', newsController.getAllNews);

// Route pour ajouter une nouvelle nouveauté
router.post('/', newsController.addNews);

// Route pour mettre à jour une nouveauté existante
router.put('/:id', newsController.updateNews);

// Route pour supprimer une nouveauté existante
router.delete('/:id', newsController.deleteNews);

// Exporter le router
module.exports = router;