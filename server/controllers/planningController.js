// controllers/planningController.js
const { getDb } = require('../config/db');

// Fonction pour récupérer tous les documents de la collection 'planning'
async function getAllPlanning(req, res) {
    try {
        const jours = req.query.jour; // Récupère les jours de la requête
        const db = getDb();
        let query = {};
    
        // Si des jours sont fournis, on filtre par ces jours
        if (jours) {
          const joursArray = jours.split(',');
          query = { jour: { $in: joursArray } };
        }
    
        // Rechercher les artistes dans la base de données
        const planning = await db.collection('planning').find(query).toArray();
    
        res.json(planning);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };
    async function updatePlanning(req, res) {
      try {
        const { nomArtist } = req.params;
        const updatedData = req.body;
        

        const db = getDb();
        const result = await db.collection('planning').findOneAndUpdate(
          { nomArtist: nomArtist }, // Critère de recherche
          { $set: updatedData }, // Données de mise à jour
          { returnOriginal: false } // Retourner le document mis à jour
        );
    
        res.json(result.value);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
    
    // Fonction pour supprimer les documents de la collection 'planning' par nom d'artiste
    async function deletePlanning(req, res) {
      const { nomArtist } = req.params; // Récupérer le nom de l'artiste à partir des paramètres de la requête
    
      try {
        const db = getDb();
    
        // Trouver les documents à supprimer
        const planningEntries = await db.collection('planning').find({ nomArtist }).toArray();
    
        if (planningEntries.length === 0) {
          return res.status(404).json({ message: 'Entrées de planning non trouvées pour cet artiste' });
        }
    
        // Supprimer toutes les entrées dans 'planning' qui sont associées à cet artiste par le nom
        const planningResult = await db.collection('planning').deleteMany({ nomArtist });
    
        res.json({
          message: 'Entrées de planning associées supprimées avec succès',
          planningDeleted: planningResult.deletedCount,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
    async function createPlanning(req, res) {
      try {
        const db = getDb();
        const newPlanning = req.body;
    
        // Assurez-vous que tous les champs nécessaires sont présents
        if (!newPlanning.nomArtist || !newPlanning.jour || !newPlanning.heureDebut || !newPlanning.heureFin || !newPlanning.nomScene) {
          return res.status(400).json({ message: 'Tous les champs doivent être remplis' });
        }
    
        // Insérer le nouvel artiste dans la collection 'planning'
        await db.collection('planning').insertOne(newPlanning);
        res.status(201).json({ message: 'Planning ajouté avec succès', planning: newPlanning });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
    
    module.exports = { getAllPlanning, updatePlanning, deletePlanning, createPlanning };

