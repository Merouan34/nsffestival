// AdminAccueil.js
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAccueil.css';

class AdminAccueil extends Component {
  // Utiliser le constructeur pour initialiser `this.props`
  constructor(props) {
    super(props);
  }

  // Fonction pour rediriger vers AdminControl.js
  goToAdminControl = () => {
    this.props.navigate('/admin-control');
  };

  // Fonction pour rediriger vers Nouveautes.js
  goToNouveautes = () => {
    this.props.navigate('/admin-nouveautes');
  };

  // Fonction pour rediriger vers Urgent.js
  goToUrgent = () => {
    this.props.navigate('/admin-urgent');
  };

  // Fonction pour rediriger vers Partenaires.js
  goToPartenaires = () => {
    this.props.navigate('/admin-part');
  };

  // Fonction pour gérer la déconnexion
  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    this.props.navigate('/login');
  };

  render() {
    return (
      <div className="admin-home">
        <h1>Bienvenue dans l'espace administrateur</h1>
        <div className="admin-buttons">
          <button onClick={this.goToAdminControl}>Modifier les Artistes</button>
          <button onClick={this.goToNouveautes}>Modifier les Nouveautés</button>
          <button onClick={this.goToUrgent}>Modifier les Actualités Urgentes</button>
          <button onClick={this.goToPartenaires}>Modifier les Partenaires</button>
        </div>
        <button className='logout' onClick={this.handleLogout}>Se déconnecter</button>
      </div>
    );
  }
}

// HOC pour injecter `navigate` en tant que prop
const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation(AdminAccueil);
