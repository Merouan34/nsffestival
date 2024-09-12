import React, { Component } from 'react';
import './Nouveaute.css'; // Assurez-vous de créer ce fichier CSS

const apiUrl = process.env.REACT_APP_API_URL;

class Nouveaute extends Component {
  state = {
    news: [],
    currentIndex: 0,
    isLoading: true,
    error: null, // Ajouter un état pour gérer les erreurs
  };

  async componentDidMount() {
    try {
      await this.fetchAllNews();
      this.startAutoScroll();
    } catch (error) {
      this.setState({ error: 'Erreur lors du chargement des nouveautés. Veuillez réessayer plus tard.' });
    }
  }

  // Fonction pour fetch toutes les pages de nouveautés
  fetchAllNews = async () => {
    const allNews = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await fetch(`${apiUrl}/api/news?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        allNews.push(...data.news);
        totalPages = data.totalPages;
        currentPage++;
      }

      this.setState({
        news: allNews,
        isLoading: false,
        error: null, // Remettre l'erreur à null si la requête réussit
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des nouveautés:', error);
      this.setState({
        isLoading: false,
        error: 'Erreur lors de la récupération des nouveautés. Veuillez réessayer plus tard.',
      });
    }
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
    const { news, currentIndex, isLoading, error } = this.state;
    const currentNews = news[currentIndex];

    return (
      <div className="nouveaute-container">
        <h2 className="nouveaute-title">Nouveautés</h2>
        <div className="nouveaute-slider">
          {isLoading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <div className="nouveaute-item">
                <h3 className="nouveaute-item-title">{currentNews.titre}</h3>
                
              </div>
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
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Nouveaute;
