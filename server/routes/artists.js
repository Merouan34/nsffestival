
const express = require('express');
const router = express.Router();
const {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist
} = require('../controllers/artistsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       required:
 *         - nomArtist
 *         - typeMusique
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de l'artiste
 *         nomArtist:
 *           type: string
 *           description: Nom de l'artiste
 *         descriptionArtist:
 *           type: string
 *           description: Description de l'artiste
 *         Img:
 *           type: string
 *           description: URL de l'image de l'artiste
 *         typeMusique:
 *           type: string
 *           description: Genre musical de l'artiste
 *         heureDebut:
 *           type: string
 *           description: Heure de début de la performance
 *         heureFin:
 *           type: string
 *           description: Heure de fin de la performance
 *         jour:
 *           type: string
 *           description: Jour de la performance
 *         nomScene:
 *           type: string
 *           description: Nom de la scène
 */

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Récupérer tous les artistes
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: Liste de tous les artistes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */
router.get('/artists', getAllArtists);

/**
 * @swagger
 * /api/artists:
 *   post:
 *     summary: Créer un nouvel artiste
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       201:
 *         description: Artiste créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 */
router.post('/artists', createArtist);

/**
 * @swagger
 * /api/artists/{id}:
 *   put:
 *     summary: Mettre à jour un artiste
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'artiste à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       200:
 *         description: Artiste mis à jour
 */
router.put('/artists/:id', updateArtist);

/**
 * @swagger
 * /api/artists/{id}:
 *   delete:
 *     summary: Supprimer un artiste
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'artiste à supprimer
 *     responses:
 *       200:
 *         description: Artiste supprimé avec succès
 */
router.delete('/artists/:id', deleteArtist);

module.exports = router;

