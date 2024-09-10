const { getDb } = require('../config/db'); // Assure-toi que le chemin est correct

// Fonction pour récupérer toutes les cartes
async function getAllCards(req, res) {
  try {
    const db = getDb();
    const { typeLieu } = req.query; // Récupère le paramètre de la requête

    let query = {};

    // Si des types sont fournis, on filtre par ces types
    if (typeLieu) {
      const typesArray = typeLieu.split(','); // Convertir la chaîne en tableau
      query = { typeLieu: { $in: typesArray } };
    }

    // Rechercher les cartes dans la base de données
    const cards = await db.collection('card').find(query).toArray();

    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAllCards };