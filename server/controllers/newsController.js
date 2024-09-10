const { getDb } = require('../config/db'); // Assurez-vous que le chemin du fichier est correct
const { ObjectId } = require('mongodb'); // Nécessaire pour gérer les identifiants MongoDB
// Fonction pour récupérer toutes les nouveautés avec pagination
async function getAllNews(req, res) {
  try {
    const db = getDb();
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 5; // Nombre d'éléments par page, par défaut 5
    const skip = (page - 1) * limit; // Calculer les éléments à sauter pour la pagination

    const totalNews = await db.collection('news').countDocuments(); // Compter le total des nouveautés
    const totalPages = Math.ceil(totalNews / limit);

    const news = await db.collection('news').find().skip(skip).limit(limit).toArray();

    res.json({
      news: news,
      totalPages: totalPages,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour ajouter une nouveauté
async function addNews(req, res) {
  try {
    const db = getDb();
    const newNews = req.body;

    const result = await db.collection('news').insertOne(newNews);

    res.status(201).json({ message: 'Nouvelle nouveauté ajoutée avec succès', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour mettre à jour une nouveauté existante
async function updateNews(req, res) {
  try {
    const db = getDb();
    const newsId = req.params.id;
    const updatedNews = req.body;

    const result = await db.collection('news').updateOne(
      { _id: new ObjectId(newsId) },
      { $set: updatedNews }
    );

    if (result.matchedCount > 0) {
      res.json({ message: 'Nouveauté mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Nouveauté non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Fonction pour supprimer une nouveauté
async function deleteNews(req, res) {
  const { id } = req.params; // Récupérer l'ID de la nouveauté à partir des paramètres de la requête

  try {
    const db = getDb();

    // Trouver la nouveauté à supprimer
    const news = await db.collection('news').findOne({ _id: new ObjectId(id) });

    if (!news) {
      return res.status(404).json({ message: 'Nouveauté non trouvée' });
    }

    const newsTitle = news.titre; // Titre de la nouveauté utilisé pour la suppression dans `relatedData`

    // Supprimer la nouveauté de la collection 'news'
    const newsResult = await db.collection('news').deleteOne({ _id: new ObjectId(id) });

    if (newsResult.deletedCount > 0) {
      // Supprimer toutes les entrées dans 'relatedData' qui sont associées à cette nouveauté par le titre
      const relatedDataResult = await db.collection('relatedData').deleteMany({ titre: newsTitle });

      res.json({
        message: 'Nouveauté et entrées associées supprimées avec succès',
        newsDeleted: newsResult.deletedCount,
        relatedDataDeleted: relatedDataResult.deletedCount,
      });
    } else {
      res.status(404).json({ message: 'Nouveauté non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Exporter les fonctions du contrôleur
module.exports = {
  getAllNews,
  addNews,
  updateNews,
  deleteNews
};
