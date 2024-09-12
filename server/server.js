// server.js
const express = require('express');

const path = require('path');
const { connectDB } = require('./config/db');
const artistRoutes = require('./routes/artists');
const cardRoutes = require('./routes/cardRoutes');
const planningRoutes = require('./routes/planningRoutes');
const usersRoutes = require('./routes/usersRoutes');
const cors = require('cors'); // Importer le package cors
const urgentRoutes = require('./routes/urgentRoutes');
const newsRoutes = require('./routes/newsRoutes'); // Assurez-vous que le chemin du fichier est correct
const userRoutes = require('./routes/usersRoutes');
const partenaireRoutes = require('./routes/partenaireRoutes')
const helmet = require('helmet');
// Utiliser les routes

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: '*', // Permet les requêtes de tous les domaines. À ajuster en fonction de la sécurité.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Appliquer le middleware CORS avec les options configurées
app.use(cors(corsOptions));

// Middleware pour analyser les corps de requêtes en JSON
app.use(express.json());



// Utiliser les routes pour les artistes
app.use('/api', artistRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/urg', urgentRoutes);
app.use('/api/news', newsRoutes); 
app.use('/api/partenaires', partenaireRoutes);// Utiliser les routes des nouveautés
app.use('/api', userRoutes);


app.use(express.static(path.join(__dirname, '../nsf/build')));

// Route pour toutes les autres requêtes - servir le fichier index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../nsf/build', 'index.html'));
});

// Démarrer le serveur après que la connexion à MongoDB ait réussi
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de démarrage du serveur:', err.message);
  });
