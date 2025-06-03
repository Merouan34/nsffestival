const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { addPartenaire } = require('../controllers/partenaireController');
const { getDb } = require('../config/db');

let mongod;
let client;
let db;

jest.mock('../config/db'); // Mock de getDb

describe('Partenaires Controller - Add Partenaire', () => {
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

  it('should add a new partenaire to the collection', async () => {
    const req = {
      body: {
        nom: 'Tech Innovators',
        description: 'Une entreprise de technologie de pointe spécialisée dans les solutions de cloud computing et l\'intelligence artificielle.',
        Img: 'https://example.com/images/tech-innovators.jpg',
        img: ''
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Appelle la fonction du contrôleur pour ajouter un partenaire
    await addPartenaire(req, res);

    // Vérifie que le partenaire a bien été ajouté dans la collection 'partenaires'
    const insertedPartenaire = await db.collection('partenaires').findOne({ nom: 'Tech Innovators' });

    // Si insertedPartenaire est null, la vérification échouera
    expect(insertedPartenaire).not.toBeNull();
    expect(insertedPartenaire.nom).toBe(req.body.nom);

    // Vérifie les réponses HTTP
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Partenaire ajouté avec succès',
      id: insertedPartenaire._id, // Utilise l'ID de l'objet inséré comme attendu dans la réponse
    });
  });
});
