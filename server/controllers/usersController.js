const fetch = require('node-fetch'); // Assurez-vous d'avoir ce package installé avec npm install node-fetch
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');

// Clés reCAPTCHA et JWT directement dans le code
const JWT_SECRET_KEY = 'AiBQdI2IcKYuU3DvHPQ90PQ70zvr6qS5FadCLpm95XLPmbXlkdTcvx7HefFRsh78'; // Nouveau token JWT secret
const RECAPTCHA_SECRET_KEY = '6Lf1fz4qAAAAAExf7MtRXEtLEZJ6u_s0kWLiZr0O'; // Clé secrète reCAPTCHA

// Middleware pour vérifier le token reCAPTCHA
async function verifyRecaptchaToken(req, res, next) {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'Token reCAPTCHA manquant.' });
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });
    
    const data = await response.json();
    if (!data.success) {
      return res.status(400).json({ message: 'Échec de la vérification reCAPTCHA. Veuillez réessayer.' });
    }

    next(); // Continue vers l'enregistrement ou la connexion
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la vérification reCAPTCHA.' });
  }
}

// Enregistrement d'un nouvel utilisateur
exports.registerUser = [verifyRecaptchaToken, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,  
      password: hashedPassword,
      admin: 0,
    };

    await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

// Connexion d'un utilisateur
exports.loginUser = [verifyRecaptchaToken, async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ userId: user._id, admin: user.admin }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie.', token, admin: user.admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];
