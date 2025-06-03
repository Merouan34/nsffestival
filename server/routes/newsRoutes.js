// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController'); // Assurez-vous que le chemin du fichier est correct

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - titre
 *         - typeNouveaute
 *         - date
 *         - auteur
 *         - descriptionpb
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de la nouveauté
 *         titre:
 *           type: string
 *           description: Titre de la nouveauté
 *         typeNouveaute:
 *           type: string
 *           description: Type de la nouveauté (ex. Sécurité, Mise à jour)
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date de la nouveauté
 *         auteur:
 *           type: string
 *           description: Auteur de la nouveauté
 *         descriptionpb:
 *           type: string
 *           description: Description détaillée de la nouveauté
 */
/**
 * @swagger
 * tags:
 *   name: News
 *   description: Gestion des nouveautés
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Récupère toutes les nouveautés avec pagination
 *     tags:
 *       - News
 *     responses:
 *       200:
 *         description: Liste des nouveautés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la nouveauté
 *                   titre:
 *                     type: string
 *                     description: Titre de la nouveauté
 *                   typeNouveaute:
 *                     type: string
 *                     description: Type de la nouveauté (e.g., Sécurité, Mise à jour)
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Date de la nouveauté
 *                   auteur:
 *                     type: string
 *                     description: Auteur de la nouveauté
 *                   descriptionpb:
 *                     type: string
 *                     description: Description détaillée de la nouveauté
 *   post:
 *     summary: Ajoute une nouvelle nouveauté
 *     tags:
 *       - News
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 description: Titre de la nouveauté
 *               typeNouveaute:
 *                 type: string
 *                 description: Type de la nouveauté
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date de la nouveauté
 *               auteur:
 *                 type: string
 *                 description: Auteur de la nouveauté
 *               descriptionpb:
 *                 type: string
 *                 description: Description détaillée de la nouveauté
 *     responses:
 *       201:
 *         description: Nouvelle nouveauté créée
 *   put:
 *     summary: Met à jour une nouveauté existante
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la nouveauté à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 description: Nouveau titre de la nouveauté
 *               typeNouveaute:
 *                 type: string
 *                 description: Nouveau type de la nouveauté
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Nouvelle date de la nouveauté
 *               auteur:
 *                 type: string
 *                 description: Nouvel auteur de la nouveauté
 *               descriptionpb:
 *                 type: string
 *                 description: Nouvelle description détaillée
 *     responses:
 *       200:
 *         description: Nouveauté mise à jour
 *   delete:
 *     summary: Supprime une nouveauté existante
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la nouveauté à supprimer
 *     responses:
 *       204:
 *         description: Nouveauté supprimée
 */

router.get('/', newsController.getAllNews);

// Route pour ajouter une nouvelle nouveauté
router.post('/', newsController.addNews);

// Route pour mettre à jour une nouveauté existante
router.put('/:id', newsController.updateNews);

// Route pour supprimer une nouveauté existante
router.delete('/:id', newsController.deleteNews);

// Exporter le router
module.exports = router;
