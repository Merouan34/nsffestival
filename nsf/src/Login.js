import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // Importer le composant reCaptcha
import './Account.css';

const apiUrl = process.env.REACT_APP_API_URL;
const REACT_APP_RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY; // Clé du site reCaptcha

// Fonction pour vérifier la connexion et rediriger si nécessaire
const checkAuth = (navigate) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (token) {
    if (userType === 'admin') {
      navigate('/admin-control'); // Redirection vers l'espace admin
    } else {
      navigate('/user-control'); // Redirection vers l'espace utilisateur
    }
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      recaptchaToken: '' // Ajout d'un état pour le token reCaptcha
    };
  }

  componentDidMount() {
    // Vérifier la connexion lorsque le composant se monte
    checkAuth(this.props.navigate);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRecaptchaChange = (token) => {
    this.setState({ recaptchaToken: token });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, recaptchaToken } = this.state;

    // Vérifier que le token reCaptcha est présent
    if (!recaptchaToken) {
      this.setState({ message: 'Veuillez vérifier que vous n\'êtes pas un robot.' });
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, recaptchaToken }) // Envoyer le token reCaptcha
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ message: 'Connexion réussie.' });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', data.admin ? 'admin' : 'user');
        localStorage.setItem('username', data.username); // Stocker le nom d'utilisateur

        // Redirection basée sur le statut d'admin
        if (data.admin == 1) {
          this.props.navigate('/admin-accueil');
        } else {
          this.props.navigate('/user-control');
        }
      } else {
        this.setState({ message: data.message });
      }
    } catch (error) {
      this.setState({ message: 'Erreur lors de la connexion.' });
    }
  };

  render() {
    return (
      <div className="containeraccount">
        <div className="form-container">
          <h1>CONNEXION</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={this.handleChange} required />

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" onChange={this.handleChange} required />

            {/* Ajouter le composant ReCAPTCHA */}
            <ReCAPTCHA
              sitekey={REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={this.handleRecaptchaChange}
            />

            <input type="submit" value="Se connecter" />
          </form>
          {this.state.message && <p>{this.state.message}</p>}
          <a href="/register">Créer un compte</a>
        </div>
      </div>
    );
  }
}

const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation(Login);
