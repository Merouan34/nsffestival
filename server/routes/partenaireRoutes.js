const express = require('express');
const router = express.Router();
const PartenaireController = require('../controllers/partenaireController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Partenaire:
 *       type: object
 *       required:
 *         - nom
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique du partenaire
 *         nom:
 *           type: string
 *           description: Nom du partenaire
 *         description:
 *           type: string
 *           description: Description du partenaire
 *         Img:
 *           type: string
 *           description: URL de l'image du partenaire
 *         img:
 *           type: string
 *           description: URL de l'image (optionnelle)
 */

/**
 * @swagger
 * tags:
 *   name: Partenaires
 *   description: Gestion des partenaires
 */

/**
 * @swagger
 * /api/partenaires:
 *   get:
 *     summary: Récupère tous les partenaires
 *     tags:
 *       - Partenaires
 *     responses:
 *       200:
 *         description: Liste des partenaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partenaire'
 */

/**
 * @swagger
 * /api/partenaires:
 *   post:
 *     summary: Ajoute un nouveau partenaire
 *     tags:
 *       - Partenaires
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partenaire'
 *     responses:
 *       201:
 *         description: Partenaire ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partenaire'
 */

/**
 * @swagger
 * /api/partenaires/{id}:
 *   put:
 *     summary: Met à jour un partenaire existant
 *     tags:
 *       - Partenaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du partenaire à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partenaire'
 *     responses:
 *       200:
 *         description: Partenaire mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partenaire'
 */

/**
 * @swagger
 * /api/partenaires/{id}:
 *   delete:
 *     summary: Supprime un partenaire existant
 *     tags:
 *       - Partenaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du partenaire à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Partenaire supprimé avec succès
 */

// Routes pour les partenaires
router.get('/', PartenaireController.getAllPartenaires); // Obtenir tous les partenaires
router.post('/', PartenaireController.addPartenaire); // Ajouter un partenaire
router.put('/:id', PartenaireController.updatePartenaire); // Mettre à jour un partenaire
router.delete('/:id', PartenaireController.deletePartenaire); // Supprimer un partenaire

module.exports = router;