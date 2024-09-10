// controllers/artistsController.js
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb'); // Nécessaire pour gérer les identifiants MongoDB

// Fonction pour récupérer tous les artistes
async function getAllArtists(req, res) {
  try {
    const db = getDb();
    const query = {};
    const { typeMusique } = req.query;

    // Ajouter des filtres à la requête si le paramètre existe
    if (typeMusique) {
      query.typeMusique = typeMusique; // Assure-toi que ce champ correspond à celui dans ta base de données
    }

    const artists = await db.collection('artists').find(query).toArray(); // Trouver avec les filtres
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour ajouter un nouvel artiste
async function createArtist(req, res) {
  try {
    const db = getDb();
    const newArtist = req.body;
    
    await db.collection('artists').insertOne(newArtist);
    res.status(201).json({ message: 'Artiste ajouté avec succès', artist: newArtist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour mettre à jour un artiste
async function updateArtist(req, res) {
  try {
    const db = getDb();
    const artistId = req.params.id; // ID de l'artiste à mettre à jour
    const updatedArtist = req.body;

    const result = await db.collection('artists').updateOne(
      { _id: new ObjectId(artistId) },
      { $set: updatedArtist }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }

    res.json({ message: 'Artiste mis à jour avec succès', artist: updatedArtist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour supprimer un artiste
async function deleteArtist(req, res) {
  const { id } = req.params; // Récupérer l'ID de l'artiste à partir des paramètres de la requête

  try {
    const db = getDb();

    // Trouver l'artiste à supprimer
    const artist = await db.collection('artists').findOne({ _id: new ObjectId(id) });

    if (!artist) {
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }

    const artistName = artist.nomArtist; // Nom de l'artiste utilisé pour la suppression dans `planning`

    // Supprimer l'artiste de la collection 'artists'
    const artistResult = await db.collection('artists').deleteOne({ _id: new ObjectId(id) });

    if (artistResult.deletedCount > 0) {
      // Supprimer toutes les entrées dans 'planning' qui sont associées à cet artiste par le nom
      const planningResult = await db.collection('planning').deleteMany({ nomArtist: artistName });

      res.json({
        message: 'Artiste et entrées de planning associées supprimés avec succès',
        artistDeleted: artistResult.deletedCount,
        planningDeleted: planningResult.deletedCount,
      });
    } else {
      res.status(404).json({ message: 'Artiste non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist
};
