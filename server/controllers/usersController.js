// controllers/UserController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');
const REACT_APP_RECAPTCHA_SECRET_KEY = process.env.REACT_APP_RECAPTCHA_SECRET_KEY; // Clé secrète reCaptcha

// Enregistrement d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion de l'utilisateur dans la base de données
    const newUser = {
      name,
      email,
      password: hashedPassword,
      admin: 0, // Par défaut, l'utilisateur n'est pas un administrateur
    };

    await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Génération d'un token JWT
    const token = jwt.sign({ userId: user._id, admin: user.admin }, REACT_APP_RECAPTCHA_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie.', token, admin: user.admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
