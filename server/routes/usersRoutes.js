// routes/UserRoutes.js

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Pour effectuer la requête vers l'API Google reCaptcha
const UserController = require('../controllers/usersController');

const REACT_APP_RECAPTCHA_SECRET_KEY = process.env.REACT_APP_RECAPTCHA_SECRET_KEY; // Clé secrète reCaptcha

// Middleware pour vérifier le token reCaptcha
async function verifyRecaptchaToken(req, res, next) {
  const { recaptchaToken } = req.body; // Récupère le token reCaptcha du corps de la requête

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'Token reCaptcha manquant' });
  }

  try {
    // Effectue une requête POST à l'API reCaptcha pour vérifier le token
    
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${REACT_APP_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`, {
      method: 'POST'
    });
    const data = await response.json();
    if (!data.success) {
      return res.status(400).json({ message: 'Échec de la vérification reCaptcha. Veuillez réessayer.' });
    }

    // Si le token est validé, passe à l'étape suivante
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la vérification reCaptcha' });
  }
}

// Route pour l'enregistrement d'un utilisateur avec vérification reCaptcha
router.post('/register', verifyRecaptchaToken, UserController.registerUser);

// Route pour la connexion d'un utilisateur avec vérification reCaptcha
router.post('/login', verifyRecaptchaToken, UserController.loginUser);

module.exports = router;
