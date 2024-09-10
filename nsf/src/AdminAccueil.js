// AdminAccueil.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAccueil.css';

const AdminAccueil = () => {
  const navigate = useNavigate();

  // Fonction pour rediriger vers AdminControl.js
  const goToAdminControl = () => {
    navigate('/admin-control');
  };

  // Fonction pour rediriger vers Nouveautes.js
  const goToNouveautes = () => {
    navigate('/admin-nouveautes');
  };

  // Fonction pour rediriger vers Urgent.js
  const goToUrgent = () => {
    navigate('/admin-urgent');
  };

  // Fonction pour rediriger vers Partenaires.js
  const goToPartenaires = () => {
    navigate('/admin-part');
  };

  return (
    <div className="admin-home">
      <h1>Bienvenue dans l'espace administrateur</h1>
      <div className="admin-buttons">
        <button onClick={goToAdminControl}>Modifier les Artistes</button>
        <button onClick={goToNouveautes}>Modifier les Nouveautés</button>
        <button onClick={goToUrgent}>Modifier les Actualités Urgentes</button>
        <button onClick={goToPartenaires}>Modifier les Partenaires</button>
      </div>
    </div>
  );
};

export default AdminAccueil;
