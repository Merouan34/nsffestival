import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css'


const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  
  const handleNavigation = () => {
    if (token) {
      // Si l'utilisateur est connecté, redirige vers l'espace utilisateur ou admin
      if (userType === 'admin') {
        navigate('/admin-accueil');
      } else {
        navigate('/user-control');
      }
    } else {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
      navigate('/login');
    }
  };

  return (
    <nav className="navigation-bar">
      <button className="navigation-button" onClick={handleNavigation}>
        {token ? 'Espace Utilisateur' : 'Connexion'}
      </button>
    </nav>
  );
};

export default Navigation;