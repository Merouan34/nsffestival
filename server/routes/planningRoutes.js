// routes/planning.js

const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planningController');
/**
 * @swagger
 * components:
 *   schemas:
 *     Planning:
 *       type: object
 *       required:
 *         - nomArtist
 *         - jour
 *         - heureDebut
 *         - heureFin
 *         - nomScene
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique du planning
 *         id:
 *           type: integer
 *           description: Identifiant du planning
 *         nomArtist:
 *           type: string
 *           description: Nom de l'artiste
 *         jour:
 *           type: string
 *           description: Jour de la performance
 *         heureDebut:
 *           type: string
 *           format: time
 *           description: Heure de début de la performance
 *         heureFin:
 *           type: string
 *           format: time
 *           description: Heure de fin de la performance
 *         nomScene:
 *           type: string
 *           description: Nom de la scène
 */

/**
 * @swagger
 * tags:
 *   name: Planning
 *   description: Gestion des plannings d'artistes
 */

/**
 * @swagger
 * /api/planning:
 *   get:
 *     summary: Récupère tous les plannings
 *     tags:
 *       - Planning
 *     responses:
 *       200:
 *         description: Liste des plannings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Planning'
 */

/**
 * @swagger
 * /api/planning:
 *   post:
 *     summary: Crée un nouveau planning
 *     tags:
 *       - Planning
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planning'
 *     responses:
 *       201:
 *         description: Planning créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Planning'
 */

/**
 * @swagger
 * /api/planning/{nomArtist}:
 *   put:
 *     summary: Met à jour un planning d'artiste
 *     tags:
 *       - Planning
 *     parameters:
 *       - in: path
 *         name: nomArtist
 *         required: true
 *         description: Nom de l'artiste dont le planning doit être mis à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planning'
 *     responses:
 *       200:
 *         description: Planning mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Planning'
 */

/**
 * @swagger
 * /api/planning/{nomArtist}:
 *   delete:
 *     summary: Supprime un planning d'artiste
 *     tags:
 *       - Planning
 *     parameters:
 *       - in: path
 *         name: nomArtist
 *         required: true
 *         description: Nom de l'artiste dont le planning doit être supprimé
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Planning supprimé avec succès
 */

// Récupérer tous les plannings
router.get('/', planningController.getAllPlanning);

router.post('/', planningController.createPlanning);

// Mettre à jour un planning d'artiste par nom d'artiste
router.put('/:nomArtist', planningController.updatePlanning);

// Supprimer un planning d'artiste par nom d'artiste
router.delete('/:nomArtist', planningController.deletePlanning);

module.exports = router;
