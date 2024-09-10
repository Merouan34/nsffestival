import React, { Component } from 'react';
import './Nouveaute.css'; // Assurez-vous de créer ce fichier CSS

const apiUrl = process.env.REACT_APP_API_URL;

class Nouveaute extends Component {
  state = {
    news: [],
    currentIndex: 0,
    isLoading: true,
  };

  async componentDidMount() {
    await this.fetchAllNews();
    this.startAutoScroll();
  }

  // Fonction pour fetch toutes les pages de nouveautés
  fetchAllNews = async () => {
    const allNews = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      try {
        const response = await fetch(`${apiUrl}/api/news?page=${currentPage}`);
        const data = await response.json();
        allNews.push(...data.news);
        totalPages = data.totalPages;
        currentPage++;
      } catch (error) {
        console.error('Erreur lors de la récupération des nouveautés:', error);
        break;
      }
    }

    this.setState({
      news: allNews,
      isLoading: false,
    });
  };

  // Fonction pour faire défiler les nouveautés automatiquement
  startAutoScroll = () => {
    this.scrollInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentIndex: (prevState.currentIndex + 1) % prevState.news.length
      }));
    }, 5000); // Changez cette valeur pour ajuster la vitesse du défilement (en millisecondes)
  };

  componentWillUnmount() {
    // Nettoyez l'intervalle lorsque le composant est démonté
    clearInterval(this.scrollInterval);
  }

  render() {
    const { news, currentIndex, isLoading } = this.state;
    const currentNews = news[currentIndex];

    return (
      <div className="nouveaute-container">
        <h2 className="nouveaute-title">Nouveautés</h2>
        <div className="nouveaute-slider">
          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <div className="nouveaute-item">
              <h3 className="nouveaute-item-title">{currentNews.titre}</h3>
              <p className="nouveaute-item-description">{currentNews.descriptionpb}</p>
              
            </div>
          )}
          <button className="slider-arrow left" onClick={() => this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex - 1 + prevState.news.length) % prevState.news.length
          }))}>
            &larr;
          </button>
          <button className="slider-arrow right" onClick={() => this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex + 1) % prevState.news.length
          }))}>
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default Nouveaute;
