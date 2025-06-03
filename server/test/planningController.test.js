const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createPlanning } = require('../controllers/planningController');
const { getDb } = require('../config/db');

let mongod;
let client;
let db;

jest.mock('../config/db'); // Mock de getDb

describe('Planning Controller - Add Planning', () => {
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

  it('should add a new planning item to the collection', async () => {
    const req = {
      body: {
        nomArtist: 'VII',
        jour: 'vendredi',
        heureDebut: '19:00:00',
        heureFin: '20:00:00',
        nomScene: 'La scène vers l\'ile au canard'
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Appelle la fonction du contrôleur pour ajouter le planning
    await createPlanning(req, res);

    // Vérifie que le planning a bien été ajouté dans la collection 'planning'
    const insertedPlanning = await db.collection('planning').findOne({ nomArtist: 'VII' });

    // Si insertedPlanning est null, la vérification échouera
    expect(insertedPlanning).not.toBeNull();
    expect(insertedPlanning.nomArtist).toBe(req.body.nomArtist);

    // Vérifie les réponses HTTP
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Planning ajouté avec succès',
      planning: {
        _id: insertedPlanning._id,
        nomArtist: req.body.nomArtist,
        jour: req.body.jour,
        heureDebut: req.body.heureDebut,
        heureFin: req.body.heureFin,
        nomScene: req.body.nomScene,
      },
    });
  });
});