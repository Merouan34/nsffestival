const { getDb } = require('../config/db'); // Assurez-vous que le chemin du fichier est correct
const { ObjectId } = require('mongodb'); // Nécessaire pour gérer les identifiants MongoDB

// Fonction pour récupérer toutes les urgences avec pagination
async function getAllUrgents(req, res) {
  try {
    const db = getDb();
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 5; // Nombre d'éléments par page, par défaut 5
    const skip = (page - 1) * limit; // Calculer les éléments à sauter pour la pagination

    const totalUrgents = await db.collection('urgent').countDocuments(); // Compter le total des urgences
    const totalPages = Math.ceil(totalUrgents / limit);

    const urgents = await db.collection('urgent').find().skip(skip).limit(limit).toArray();

    res.json({
      urgents: urgents,
      totalPages: totalPages,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour ajouter une urgence
async function addUrgent(req, res) {
  try {
    const db = getDb();
    const newUrgent = req.body;

    const result = await db.collection('urgent').insertOne(newUrgent);

    res.status(201).json({ message: 'Urgence ajoutée avec succès', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour mettre à jour une urgence existante
async function updateUrgent(req, res) {
  try {
    const db = getDb();
    const urgentId = req.params.id;
    const updatedUrgent = req.body;

    const result = await db.collection('urgent').updateOne(
      { _id: new ObjectId(urgentId) },
      { $set: updatedUrgent }
    );

    if (result.matchedCount > 0) {
      res.json({ message: 'Urgence mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Urgence non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour supprimer une urgence
async function deleteUrgent(req, res) {
  const { id } = req.params; // Récupérer l'ID de l'urgence à partir des paramètres de la requête

  try {
    const db = getDb();

    // Trouver l'urgence à supprimer
    const urgent = await db.collection('urgent').findOne({ _id: new ObjectId(id) });

    if (!urgent) {
      return res.status(404).json({ message: 'Urgence non trouvée' });
    }

    const urgentTitle = urgent.titre; // Titre de l'urgence utilisé pour la suppression dans `relatedData`

    // Supprimer l'urgence de la collection 'urg'
    const urgentResult = await db.collection('urgent').deleteOne({ _id: new ObjectId(id) });

    if (urgentResult.deletedCount > 0) {
      // Supprimer toutes les entrées dans 'relatedData' qui sont associées à cette urgence par le titre
      const relatedDataResult = await db.collection('relatedData').deleteMany({ titre: urgentTitle });

      res.json({
        message: 'Urgence et entrées associées supprimées avec succès',
        urgentDeleted: urgentResult.deletedCount,
        relatedDataDeleted: relatedDataResult.deletedCount,
      });
    } else {
      res.status(404).json({ message: 'Urgence non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Exporter les fonctions du contrôleur
module.exports = {
  getAllUrgents,
  addUrgent,
  updateUrgent,
  deleteUrgent
};
