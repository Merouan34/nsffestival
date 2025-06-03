const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { addUrgent } = require('../controllers/urgentController');
const { getDb } = require('../config/db');

let mongod;
let client;
let db;

jest.mock('../config/db'); // Mock de getDb

describe('Urgent Controller - Add Urgent', () => {
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

  it('should add a new urgent item to the collection', async () => {
    const req = {
      body: {
        titre: 'Panne de Réseau',
        typeurgence: 'Panne',
        descriptionpb: 'Une panne de réseau est signalée dans la région nord. Des interruptions de service sont possibles.',
        date: '2024-09-15T08:30:00Z',
        auteur: 'Support Technique',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Appelle la fonction du contrôleur pour ajouter l'urgence
    await addUrgent(req, res);

    // Vérifie que l'urgence a bien été ajoutée dans la collection 'urgents'
    const insertedUrgent = await db.collection('urgent').findOne({ titre: 'Panne de Réseau' });

    // Si insertedUrgent est null, la vérification échouera
    expect(insertedUrgent).not.toBeNull();
    expect(insertedUrgent.titre).toBe(req.body.titre);

    // Vérifie les réponses HTTP
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Urgence ajoutée avec succès',
      id: insertedUrgent._id// Utilise l'ID de l'objet inséré comme attendu dans la réponse
    });
  });
});
