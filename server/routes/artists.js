// routes/artistsRouter.js
const express = require('express');
const router = express.Router();
const {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist
} = require('../controllers/artistsController');

// Route pour récupérer tous les artistes
router.get('/artists', getAllArtists);

// Route pour créer un nouvel artiste
router.post('/artists', createArtist);

// Route pour mettre à jour un artiste existant
router.put('/artists/:id', updateArtist);

// Route pour supprimer un artiste
router.delete('/artists/:id', deleteArtist);

module.exports = router;
