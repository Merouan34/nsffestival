// routes/cardRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCards } = require('../controllers/cardController');
/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - idLieu
 *         - nomLieu
 *         - descriptionLieu
 *         - LattLieu
 *         - typeLieu
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de la carte
 *         idLieu:
 *           type: integer
 *           description: ID du lieu
 *         nomLieu:
 *           type: string
 *           description: Nom du lieu
 *         descriptionLieu:
 *           type: string
 *           description: Description du lieu
 *         lienLogoLieu:
 *           type: string
 *           description: URL du logo du lieu (optionnel)
 *         LattLieu:
 *           type: string
 *           description: Coordonnées géographiques du lieu (latitude, longitude)
 *         typeLieu:
 *           type: string
 *           description: Type de lieu (ex. scène, buvette)
 */

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Gestion des cartes
 */

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Récupère toutes les données pour la carte
 *     tags:
 *       - Cards
 *     responses:
 *       200:
 *         description: Liste de toutes les données pour la carte
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID du repère
 *                   idLieu:
 *                     type: integer
 *                     description: ID du lieu
 *                   nomLieu:
 *                     type: string
 *                     description: Nom du lieu
 *                   descriptionLieu:
 *                     type: string
 *                     description: Description du lieu
 *                   lienLogoLieu:
 *                     type: string
 *                     description: Lien vers le logo du lieu
 *                   LattLieu:
 *                     type: string
 *                     description: Latitude et longitude du lieu
 *                   typeLieu:
 *                     type: string
 *                     description: Type de lieu (e.g., scène, snack, etc.)
 */
router.get('/', getAllCards);

module.exports = router;
