import React, { Component } from 'react';
import './Actualite.css'; // Assure-toi de créer ce fichier CSS

class Actualite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'urgence',
      urgents: [],
      nouveautes: [],
      currentPage: 1,
      totalPages: 1,
    };
  }

  componentDidMount() {
    this.fetchData('urgence');
  }

  fetchData = async (type, page = 1) => {
    const url = type === 'urgence' ? `http://localhost:5000/api/urg?page=${page}` : `http://localhost:5000/api/news?page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
    ;
    console.log(url)
      if (type === 'urgence') {
        this.setState({ urgents: data.urgents,
                        totalPages: data.totalPages,
                        currentPage: page });
                       
      } else {
        this.setState({ nouveautes: data.news,
                        totalPages: data.totalPages,
                        currentPage: page });
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des données ${type}:`, error);
    }
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab, currentPage: 1, totalPages: 1 });
    this.fetchData(tab);
  };

  handlePageChange = (direction) => {
    const { activeTab, currentPage } = this.state;
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    this.fetchData(activeTab, newPage);
  };

  render() {
    const { activeTab, urgents, nouveautes, currentPage, totalPages } = this.state;
    
    const items = activeTab === 'urgence' ? urgents : nouveautes;

    return (
      <div className="bgnews"> 
        <div className="actualité-container">
            <div className="tab-buttons">
            <button
                className={`tab-button ${activeTab === 'urgence' ? 'active' : ''}`}
                onClick={() => this.handleTabChange('urgence')}
            >
                Urgence
            </button>
            <button
                className={`tab-button ${activeTab === 'nouveaute' ? 'active' : ''}`}
                onClick={() => this.handleTabChange('nouveaute')}
            >
                Nouveauté
            </button>
            </div>
            <div className="content">
            {items.map((item, index) => (
                <div key={index} className="item">
                <h3 className="item-title">{item.titre}</h3>
                <p className="item-description">{item.descriptionpb}</p>
                <small className="item-date">{new Date(item.date).toLocaleDateString()}</small>
                </div>
            ))}
            </div>
            <div className="pagination-controls">
            {currentPage > 1 && (
                <button onClick={() => this.handlePageChange('prev')}>Précédent</button>
            )}
            {currentPage < totalPages && (
                <button onClick={() => this.handlePageChange('next')}>Suivant</button>
            )}
            </div>
        </div>
      </div>       
    );
  }
}

export default Actualite;
