  const { MongoClient } = require('mongodb');
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const { createArtist } = require('../controllers/artistsController');
  const { getDb } = require('../config/db');

  let mongod;
  let client;
  let db;

  jest.mock('../config/db'); // Mock de getDb

  describe('Artists Controller - Insert Artist', () => {
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

    it('should insert a new artist into the collection', async () => {
      const req = {
        body: {
          nomArtist: 'New Artist',
          descriptionArtist: 'Test description',
          Img: 'https://example.com/image.jpg',
          typeMusique: 'rock',
          heureDebut: '18:00:00',
          heureFin: '19:00:00',
          jour: 'vendredi',
          nomScene: 'Main Stage',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Appelle la fonction du contrôleur pour insérer l'artiste
      await createArtist(req, res);

      // Vérifie que l'artiste a bien été inséré dans la collection 'artists'
      const insertedArtist = await db.collection('artists').findOne({ nomArtist: 'New Artist' });

      // Si insertedArtist est null, la vérification échouera
      expect(insertedArtist).not.toBeNull();
      expect(insertedArtist.nomArtist).toBe(req.body.nomArtist);

      // Vérifie les réponses HTTP
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Artiste ajouté avec succès',
        artist: req.body,
      });
    });
  });