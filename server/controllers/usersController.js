const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');
require('dotenv').config();

const JWT_SECRET_KEY = 'azeazeazeazeazeazeadzazdqdadz';

exports.registerUser = async (req, res) => {
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
};

exports.loginUser = async (req, res) => {
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
};
