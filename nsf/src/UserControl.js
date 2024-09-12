import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserControl.css'; // Assurez-vous de créer ce fichier CSS

class UserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') || 'Utilisateur',
      tickets: [] // Définissez une liste vide de billets par défaut
    };
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    this.props.navigate('/login');
  };

  render() {
    const { username, tickets } = this.state;

    return (
      <div className='usercontainer'>
      <div className="user-control-container">
        <h1>Bienvenue, {username} !</h1>
       
        
        {tickets.length === 0 ? (
          // Afficher un message lorsque aucun billet n'est disponible
          <div className="no-tickets">
            <h2>Aucun billet trouvé</h2>
            <p>Explorez notre <a href="/billetterie" className="link">billetterie</a> pour découvrir les événements disponibles.</p>
          </div>
        ) : (
          // Afficher les billets s'il y en a
          <div className="ticket-list">
            {tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <h2>{ticket.title}</h2>
                <p><strong>Date:</strong> {ticket.date}</p>
                <p><strong>Lieu:</strong> {ticket.location}</p>
                <p><strong>Prix:</strong> {ticket.price}</p>
                <p>{ticket.description}</p>
              </div>
            ))}
          </div>
        )} 
        <button className="logout-button" onClick={this.handleLogout}>Se déconnecter</button>
      </div>
      </div>
    );
  }
}

const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation(UserControl);
