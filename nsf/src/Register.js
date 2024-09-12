import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Account.css';

const apiUrl = process.env.REACT_APP_API_URL;
const REACT_APP_RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY; 

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordError: '',
    confirmPasswordError: '',
    message: '',
    recaptchaToken: '',
    capvalue : null // Stocke le token reCaptcha
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (name === 'password') {
        this.validatePassword(value);
      }
      if (name === 'confirmPassword') {
        this.validateConfirmPassword(value);
      }
    });
  };

  validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    let passwordError = '';

    if (password.length < minLength) {
      passwordError = 'Le mot de passe doit contenir au moins 8 caractères.';
    } else if (!hasNumber.test(password)) {
      passwordError = 'Le mot de passe doit contenir au moins un chiffre.';
    } else if (!hasUpperCase.test(password)) {
      passwordError = 'Le mot de passe doit contenir au moins une lettre majuscule.';
    } else if (!hasSpecialChar.test(password)) {
      passwordError = 'Le mot de passe doit contenir au moins un caractère spécial.';
    }

    this.setState({ passwordError }, () => {
      this.validateConfirmPassword(this.state.confirmPassword);
    });
  };

  validateConfirmPassword = (confirmPassword) => {
    const { password } = this.state;
    let confirmPasswordError = '';

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError = 'Les mots de passe ne correspondent pas.';
    }

    this.setState({ confirmPasswordError });
  };

  handleChangeCap = (e) => {
    this.setState({ capvalue: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, passwordError, confirmPasswordError, recaptchaToken } = this.state;

    if (passwordError || confirmPasswordError) return;

    try {
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, recaptchaToken })
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ message: 'Inscription réussie.' });
      } else {
        this.setState({ message: data.message });
      }
    } catch (error) {
      this.setState({ message: 'Erreur lors de l\'inscription.' });
    }
  };
  
  render() {
    return (
      <div className="containeraccount">
        <div className="form-container">
          <h1>INSCRIPTION</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" onChange={this.handleChange} required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={this.handleChange} required />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
              required
            />
            {this.state.passwordError && <p className="">{this.state.passwordError}</p>}

            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={this.handleChange}
              required
            />
            {this.state.confirmPasswordError && <p className="">{this.state.confirmPasswordError}</p>}

            {/* Composant reCaptcha */}
            <ReCAPTCHA
              sitekey='6Lf1fz4qAAAAAJMEQxOV3VAnTOkacDfBVwS-uy09'
              onChange={this.handleChangeCap} // Remplace par ta clé de site reCaptcha
            />
            <input
              type="submit"
              value="S'inscrire"
               // Désactivé si le captcha n'est pas rempli
            />
          </form>
          {this.state.message && <p>{this.state.message}</p>}
          <a href="/login">Déjà un compte ? Se connecter</a>
        </div>
      </div>
    );
  }
}

export default Register;
