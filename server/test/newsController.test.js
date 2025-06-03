const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { addNews } = require('../controllers/newsController');
const { getDb } = require('../config/db');

let mongod;
let client;
let db;

jest.mock('../config/db'); // Mock de getDb

describe('News Controller - Add News', () => {
  beforeAll(async () => {
    // Démarrer une instance MongoDB en mémoire
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // Connexion à MongoDB en mémoire
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db();
    getDb.mockReturnValue(db); // Mock getDb pour retourner la connexion en mémoire
  });

  afterAll(async () => {
    // Fermer la connexion et l'instance MongoDB en mémoire
    await client.close();
    await mongod.stop();
  });

  it('should add a new news item to the collection', async () => {
    const req = {
      body: {
        titre: 'Amélioration de la sécurité',
        typeNouveaute: 'Sécurité',
        date: '2024-09-05T12:00:00Z',
        auteur: 'Équipe de Sécurité',
        descriptionpb: 'Nous avons renforcé la sécurité des données avec un nouveau système de chiffrement avancé.'
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Appelle la fonction du contrôleur pour ajouter la nouvelle
    await addNews(req, res);

    // Vérifie que la nouvelle a bien été ajoutée dans la collection 'news'
    const insertedNews = await db.collection('news').findOne({ titre: 'Amélioration de la sécurité' });

    // Si insertedNews est null, la vérification échouera
    expect(insertedNews).not.toBeNull();
    expect(insertedNews.titre).toBe(req.body.titre);

    // Vérifie les réponses HTTP
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Nouvelle nouveauté ajoutée avec succès',
      id: insertedNews._id, // Vérifie que l'ID est retourné dans la réponse
    });
  });
});
