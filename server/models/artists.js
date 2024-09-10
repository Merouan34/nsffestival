const mongoose = require('mongoose');

// Définir le schéma artists
const programmationSchema = new mongoose.Schema({
_id: { type: String, required: true },    
nomArtist: { type: String, required: true },
descriptionArtist: { type: String, required: true},
Img: { type: String, required: true },
typeMusique: { type: String, required: true },
});

// Créer et exporter le modèle
const artists = mongoose.model('artists', programmationSchema);
module.exports = artists;
