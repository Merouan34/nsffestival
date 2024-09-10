import React, { Component } from 'react';
import './Account.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    message: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
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
            <input type="password" id="password" name="password" onChange={this.handleChange} required />

            <input type="submit" value="S'inscrire" />
          </form>
          {this.state.message && <p>{this.state.message}</p>}
          <a href="/login">Déjà un compte ? Se connecter</a>
        </div>
      </div>
    );
  }
}

export default Register;
