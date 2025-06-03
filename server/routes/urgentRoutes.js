const express = require('express');
const router = express.Router();
const UrgentController = require('../controllers/urgentController');
/**
 * @swagger
 * components:
 *   schemas:
 *     Urgent:
 *       type: object
 *       required:
 *         - titre
 *         - typeurgence
 *         - date
 *         - auteur
 *         - descriptionpb
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de l'urgence
 *         titre:
 *           type: string
 *           description: Titre de l'urgence
 *         typeurgence:
 *           type: string
 *           description: Type d'urgence (ex. Panne, Incident)
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date et heure de l'urgence
 *         auteur:
 *           type: string
 *           description: Auteur du signalement
 *         descriptionpb:
 *           type: string
 *           description: Description détaillée de l'urgence
 */

/**
 * @swagger
 * tags:
 *   name: Urgent
 *   description: Gestion des urgences
 */

/**
 * @swagger
 * /api/urg:
 *   get:
 *     summary: Récupère toutes les urgences
 *     tags:
 *       - Urgent
 *     responses:
 *       200:
 *         description: Liste des urgences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Urgent'
 */

/**
 * @swagger
 * /api/urg:
 *   post:
 *     summary: Crée une nouvelle urgence
 *     tags:
 *       - Urgent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Urgent'
 *     responses:
 *       201:
 *         description: Urgence créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Urgent'
 */

/**
 * @swagger
 * /api/urg/{id}:
 *   put:
 *     summary: Met à jour une urgence existante
 *     tags:
 *       - Urgent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'urgence à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Urgent'
 *     responses:
 *       200:
 *         description: Urgence mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Urgent'
 */

/**
 * @swagger
 * /api/urg/{id}:
 *   delete:
 *     summary: Supprime une urgence
 *     tags:
 *       - Urgent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'urgence à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Urgence supprimée avec succès
 */

// Route pour obtenir toutes les urgences avec pagination
router.get('/', UrgentController.getAllUrgents);

// Route pour ajouter une nouvelle urgence
router.post('/', UrgentController.addUrgent);

// Route pour mettre à jour une urgence existante
router.put('/:id', UrgentController.updateUrgent);

// Route pour supprimer une urgence
router.delete('/:id', UrgentController.deleteUrgent);

module.exports = router;