import React, { Component } from 'react';
import './MessageUrgent.css'; // Assure-toi de créer ce fichier CSS

class MessageUrgent extends Component {
    constructor( props) {
		super( props );
		this.state = {
        urgents: [],
        currentPage: 1,
        totalPages: 1,
        visible: true
  }
}
  componentDidMount() {
    const messageHidden = localStorage.getItem('messageUrgentHidden');
    if (messageHidden) {
      this.setState({ visible: true });
      this.fetchMessages();
  }
      return;
    }

    

  async fetchMessages(page = 1) {
    try {
      const response = await fetch(`http://localhost:5000/api/urg?page=${page}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('Response:', response); // Vérifier la réponse brute de l'API
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des messages urgents');
      }

      const data = await response.json();
      this.setState({
        urgents: data.urgents,
        currentPage: page,
        totalPages: data.totalPages
    });
      this.setState({isLoading:false})
      
      console.log(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages urgents:', error);
    }
  }
 
  handleClose = () => {
    this.setState({ visible: false });
    localStorage.setItem('messageUrgentHidden', 'true');
  };
  handlePageChange = (newPage) => {
    this.fetchMessages(newPage); // Change la page et récupère les nouveaux messages
  };
  render() {
    const { urgents, currentPage, totalPages, visible } = this.state;
    console.log(urgents,totalPages,currentPage)
    if (!visible) return null;

    return (
      <div className="message-urgent-container">
        {urgents.length === 0 ? (
          <p>Aucun message urgent disponible.</p>
        ) : (
           urgents.map((msg, index) => (
            <>
            <div key={index} className="message-urgent-item">
              <p className="message-urgent-text">
                {msg.titre}
              </p>
            </div>
            </>
          ))
        )}
        <a href="http://localhost:3000/actu" className="message-urgent-link"> En savoir plus</a>
        <button className="message-urgent-close" onClick={this.handleClose}>
          &times;
        </button>
        <div className="pagination-controls">
          {currentPage > 1 && (
            <button onClick={() => this.handlePageChange(currentPage - 1)}>
              Précédent
            </button>
          )}
          {currentPage < totalPages && (
            <button onClick={() => this.handlePageChange(currentPage + 1)}>
              Suivant
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default MessageUrgent;