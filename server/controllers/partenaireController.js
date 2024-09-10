const { getDb } = require('../config/db'); // Assurez-vous que le chemin du fichier est correct
const { ObjectId } = require('mongodb'); // Nécessaire pour gérer les identifiants MongoDB

// Fonction pour récupérer tous les partenaires
async function getAllPartenaires(req, res) {
  try {
    const db = getDb();
    const partenaires = await db.collection('partenaires').find().toArray();
    res.json(partenaires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour ajouter un partenaire
async function addPartenaire(req, res) {
  try {
    const db = getDb();
    const newPartenaire = req.body; // Récupérer les détails du partenaire depuis le corps de la requête

    const result = await db.collection('partenaires').insertOne(newPartenaire);
    res.status(201).json({ message: 'Partenaire ajouté avec succès', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour mettre à jour un partenaire existant
async function updatePartenaire(req, res) {
  try {
    const db = getDb();
    const partenaireId = req.params.id; // Récupérer l'ID du partenaire à partir des paramètres de la requête
    const updatedPartenaire = req.body; // Récupérer les nouvelles données du partenaire depuis le corps de la requête

    const result = await db.collection('partenaires').updateOne(
      { _id: new ObjectId(partenaireId) },
      { $set: updatedPartenaire }
    );

    if (result.matchedCount > 0) {
      res.json({ message: 'Partenaire mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Partenaire non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour supprimer un partenaire
async function deletePartenaire(req, res) {
  try {
    const db = getDb();
    const partenaireId = req.params.id; // Récupérer l'ID du partenaire à partir des paramètres de la requête

    const result = await db.collection('partenaires').deleteOne({ _id: new ObjectId(partenaireId) });

    if (result.deletedCount > 0) {
      res.json({ message: 'Partenaire supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Partenaire non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Exporter les fonctions du contrôleur
module.exports = {
  getAllPartenaires,
  addPartenaire,
  updatePartenaire,
  deletePartenaire
};
