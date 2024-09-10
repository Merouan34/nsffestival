import React, { Component } from 'react';
import './AdminControl.css';
import Breadcrumb from './breadcrumb';

class AdminNouveautes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [], // Liste des nouveautés récupérées
      newNouveaute: {
        titre: '',
        typeNouveaute: '',
        description: '',
        date: '',
        auteur: '',
      },
      editingNouveauteId: '',
      editingNouveaute: {
        titre: '',
        typeNouveaute: '',
        description: '',
        date: '',
        auteur: '',
      },
    };
  }

  componentDidMount() {
    this.fetchAllNews();
  }

  // Fonction pour récupérer toutes les pages de nouveautés
  fetchAllNews = async () => {
    let allNews = [];
    let page = 1; // Début à la page 1
    let hasMorePages = true;

    try {
      while (hasMorePages) {
        const response = await fetch(`http://localhost:5000/api/news?page=${page}`);
        const data = await response.json();

        if (data.news.length === 0) {
          // S'il n'y a plus de données, nous avons atteint la dernière page
          hasMorePages = false;
        } else {
          allNews = [...allNews, ...data.news];
          page += 1; // Passer à la page suivante
        }
      }

      this.setState({ news: allNews });
    } catch (error) {
      console.error("Erreur lors de la récupération des nouveautés :", error);
    }
  };

  handleInputChange = (e, field) => {
    this.setState({
      newNouveaute: {
        ...this.state.newNouveaute,
        [field]: e.target.value,
      },
    });
  };

  handleEditInputChange = (e, field) => {
    this.setState({
      editingNouveaute: {
        ...this.state.editingNouveaute,
        [field]: e.target.value,
      },
    });
  };

  handleAddNews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.newNouveaute),
      });

      if (response.ok) {
        this.fetchAllNews(); // Rafraîchir la liste après l'ajout
        this.setState({
          newNouveaute: {
            titre: '',
            typeNouveaute: '',
            description: '',
            date: '',
            auteur: '',
          },
        });
      } else {
        console.error("Erreur lors de l'ajout de la nouveauté");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la nouveauté :", error);
    }
  };

  handleEditNews = (news) => {
    // Assurez-vous que les données de planning sont correctement intégrées
    this.setState({ 
      editingNouveauteId: news._id, 
      editingNouveaute: {
        titre: news.titre,
        typeNouveaute: news.typeNouveaute,
        description: news.description,
        date: news.date,
        auteur: news.auteur,
      } 
    });
  };

  handleUpdateNews = async () => {
    const { editingNouveauteId, editingNouveaute } = this.state;

    try {
      // Mettre à jour la nouveauté dans la collection 'news'
      const response = await fetch(`http://localhost:5000/api/news/${encodeURIComponent(editingNouveauteId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Si besoin d'un token
        },
        body: JSON.stringify(editingNouveaute),
      });

      if (response.ok) {
        // Ici vous pouvez ajouter une logique pour mettre à jour d'autres collections si nécessaire

        this.fetchAllNews(); // Rafraîchir les données après la modification
        this.setState({
          editingNouveauteId: '',
          editingNouveaute: {
            titre: '',
            typeNouveaute: '',
            description: '',
            date: '',
            auteur: '',
          },
        });

        const confirmation = window.confirm('Nouveauté modifiée avec succès !');
        if (confirmation) {
          // Vous pouvez ajouter ici une action supplémentaire après la confirmation
        }
      } else {
        console.error('Erreur lors de la modification de la nouveauté');
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la nouveauté :', error);
    }
  };

  handleDeleteNews = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.fetchAllNews(); // Rafraîchir la liste après la suppression
      } else {
        console.error("Erreur lors de la suppression de la nouveauté");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la nouveauté :", error);
    }
  };

  handleLogout = () => {
    // Logique de déconnexion
    console.log("Déconnecté");
  };

  render() {
    const { news, newNouveaute, editingNouveauteId, editingNouveaute } = this.state;
    console.log(editingNouveaute,editingNouveauteId)
    return (
      <div className="admin-control">
        <h1>Gestion des Nouveautés</h1>
        <Breadcrumb
          paths={[
            { href: '/admin-accueil', label: 'Accueil' },
            { href: '/admin-nouveautes', label: 'Admin Nouveautés' },
          ]}
        />
         <div className="admin-content">
        <section className="artist-data">
          <h2>Nouveautés</h2>
          <ul>
            {news.map((newsItem) => (
              <li key={newsItem._id.$oid}>
                <strong>{newsItem.titre}</strong> - {newsItem.description} - {newsItem.date} - {newsItem.auteur}
                <br />
                <button onClick={() => this.handleEditNews(newsItem)}>Modifier</button>
                <button onClick={() => this.handleDeleteNews(newsItem._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
          </section>

          <section className="artist-form">
          <h3>Ajouter une nouvelle nouveauté</h3>
          <input
            type="text"
            placeholder="Titre"
            value={newNouveaute.titre}
            onChange={(e) => this.handleInputChange(e, 'titre')}
            required
          />
          <input
            type="text"
            placeholder="Type"
            value={newNouveaute.typeNouveaute}
            onChange={(e) => this.handleInputChange(e, 'typeNouveaute')}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newNouveaute.description}
            onChange={(e) => this.handleInputChange(e, 'description')}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={newNouveaute.date}
            onChange={(e) => this.handleInputChange(e, 'date')}
            required
          />
          <input
            type="text"
            placeholder="Auteur"
            value={newNouveaute.auteur}
            onChange={(e) => this.handleInputChange(e, 'auteur')}
            required
          />
          <button onClick={this.handleAddNews}>Ajouter</button>

          {editingNouveauteId && (
            <div>
              <h3>Modifier la nouveauté</h3>
              <input
                type="text"
                placeholder="Titre"
                value={editingNouveaute.titre}
                onChange={(e) => this.handleEditInputChange(e, 'titre')}
                required
              />
              <input
                type="text"
                placeholder="Type"
                value={editingNouveaute.typeNouveaute}
                onChange={(e) => this.handleEditInputChange(e, 'typeNouveaute')}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={editingNouveaute.description}
                onChange={(e) => this.handleEditInputChange(e, 'description')}
                required
              />
              <input
                type="date"
                placeholder="Date"
                value={editingNouveaute.date}
                onChange={(e) => this.handleEditInputChange(e, 'date')}
                required
              />
              <input
                type="text"
                placeholder="Auteur"
                value={editingNouveaute.auteur}
                onChange={(e) => this.handleEditInputChange(e, 'auteur')}
                required
              />
              <button onClick={this.handleUpdateNews}>Sauvegarder</button>
            </div>
          )}
        </section>
        </div>
        <button onClick={this.handleLogout}>Se déconnecter</button>
      </div>
    );
  }
}

export default AdminNouveautes;
