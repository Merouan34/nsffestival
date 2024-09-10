// config/db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://merouanmeneu34:clQtPE14YnLUCIkG@cluster0.7bukx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db; // Variable pour stocker la connexion à la base de données

async function connectDB() {
  try {
    await client.connect();
    console.log('Connexion à MongoDB réussie !');
    db = client.db('nsfDB'); // Sélectionne la base de données nsfDB
    return db;
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err.message);
    throw err;
  }
}

module.exports = { connectDB, getDb: () => db };