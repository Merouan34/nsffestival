import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminControl.css'; // Assurez-vous que les styles sont bien importés
import Breadcrumb from './breadcrumb'; // Assurez-vous que le chemin est correct
const apiUrl = process.env.REACT_APP_API_URL;

class AdminUrgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') || 'Administrateur',
      urgent: [], // Liste des urgences récupérées
      newUrgent: {
        titre: '',
        typeurgence: '',
        descriptionpb: '',
        date: '',
        auteur: '',
      },
      editingUrgentId: '',
      editingUrgent: {
        titre: '',
        typeurgence: '',
        descriptionpb: '',
        date: '',
        auteur: '',
      },
    };
  }

  componentDidMount() {
    this.fetchAllUrgents();
  }

  // Fonction pour récupérer toutes les urgences
  fetchAllUrgents = async () => {
    let allUrgents = [];
    let page = 1; // Début à la page 1
    let hasMorePages = true;

    try {
      while (hasMorePages) {
        const response = await fetch(`${apiUrl}/api/urg?page=${page}`);
        const data = await response.json();

        if (data.urgents.length === 0) {
          // S'il n'y a plus de données, nous avons atteint la dernière page
          hasMorePages = false;
        } else {
          allUrgents = [...allUrgents, ...data.urgents];
          page += 1; // Passer à la page suivante
        }
      }

      this.setState({ urgent: allUrgents });
    } catch (error) {
      console.error("Erreur lors de la récupération des urgences :", error);
    }
  };

  handleInputChange = (e, field) => {
    this.setState({
      newUrgent: {
        ...this.state.newUrgent,
        [field]: e.target.value,
      },
    });
  };

  handleEditInputChange = (e, field) => {
    this.setState({
      editingUrgent: {
        ...this.state.editingUrgent,
        [field]: e.target.value,
      },
    });
  };

  handleAddUrgent = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/urg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.newUrgent),
      });

      if (response.ok) {
        this.fetchAllUrgents(); // Rafraîchir la liste après l'ajout
        this.setState({
          newUrgent: {
            titre: '',
            typeurgence: '',
            descriptionpb: '',
            date: '',
            auteur: '',
          },
        });
      } else {
        console.error("Erreur lors de l'ajout de l'urgence");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'urgence :", error);
    }
  };

  handleEditUrgent = (urgent) => {
    this.setState({
      editingUrgentId: urgent._id,
      editingUrgent: {
        titre: urgent.titre,
        typeurgence: urgent.typeurgence,
        descriptionpb: urgent.descriptionpb,
        date: urgent.date,
        auteur: urgent.auteur,
      },
    });
  };

  handleUpdateUrgent = async () => {
    const { editingUrgentId, editingUrgent } = this.state;

    try {
      const response = await fetch(`${apiUrl}/api/urg/${encodeURIComponent(editingUrgentId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Si besoin d'un token
        },
        body: JSON.stringify(editingUrgent),
      });

      if (response.ok) {
        this.fetchAllUrgents(); // Rafraîchir les données après la modification
        this.setState({
          editingUrgentId: '',
          editingUrgent: {
            titre: '',
            typeurgence: '',
            descriptionpb: '',
            date: '',
            auteur: '',
          },
        });

        window.confirm('Urgence modifiée avec succès !');
      } else {
        console.error('Erreur lors de la modification de l\'urgence');
      }
    } catch (error) {
      console.error('Erreur lors de la modification de l\'urgence :', error);
    }
  };

  handleDeleteUrgent = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/urg/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.fetchAllUrgents(); // Rafraîchir la liste après la suppression
      } else {
        console.error("Erreur lors de la suppression de l'urgence");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'urgence :", error);
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    this.props.navigate('/login');
  };
  render() {
    const { urgent, newUrgent, editingUrgentId, editingUrgent } = this.state;
 
    return (
      <div className="admin-control">
        <h1>Gestion des Urgences</h1>
        <Breadcrumb
          paths={[
            { href: '/admin-accueil', label: 'Accueil' },
            { href: '/admin-urgents', label: 'Admin Urgences' },
          ]}
        />
        <div className="admin-content">
          <section className="artist-data">
            <h2>Urgences</h2>
            <ul>
              {urgent.map((urgent) => (
                <li key={urgent._id}>
                  <strong>{urgent.titre}</strong> - {urgent.descriptionpb} - {urgent.date} - {urgent.auteur}
                  <br />
                  <button onClick={() => this.handleEditUrgent(urgent)}>Modifier</button>
                  <button onClick={() => this.handleDeleteUrgent(urgent._id)}>Supprimer</button>
                </li>
              ))}
            </ul>
          </section>

          <section className="artist-form">
            <h3>Ajouter une nouvelle urgence</h3>
            <input
              type="text"
              placeholder="Titre"
              value={newUrgent.titre}
              onChange={(e) => this.handleInputChange(e, 'titre')}
              required
            />
            <input
              type="text"
              placeholder="Type"
              value={newUrgent.typeurgence}
              onChange={(e) => this.handleInputChange(e, 'typeurgence')}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newUrgent.descriptionpb}
              onChange={(e) => this.handleInputChange(e, 'descriptionpb')}
              required
            />
            <input
              type="date"
              placeholder="Date"
              value={newUrgent.date}
              onChange={(e) => this.handleInputChange(e, 'date')}
              required
            />
            <input
              type="text"
              placeholder="Auteur"
              value={newUrgent.auteur}
              onChange={(e) => this.handleInputChange(e, 'auteur')}
              required
            />
            <button onClick={this.handleAddUrgent}>Ajouter</button>

            {editingUrgentId && (
              <div>
                <h3>Modifier l'urgence</h3>
                <input
                  type="text"
                  placeholder="Titre"
                  value={editingUrgent.titre}
                  onChange={(e) => this.handleEditInputChange(e, 'titre')}
                  required
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={editingUrgent.typeurgence}
                  onChange={(e) => this.handleEditInputChange(e, 'typeurgence')}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={editingUrgent.descriptionpb}
                  onChange={(e) => this.handleEditInputChange(e, 'descriptionpb')}
                  required
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={editingUrgent.date}
                  onChange={(e) => this.handleEditInputChange(e, 'date')}
                  required
                />
                <input
                  type="text"
                  placeholder="Auteur"
                  value={editingUrgent.auteur}
                  onChange={(e) => this.handleEditInputChange(e, 'auteur')}
                  required
                />
                <button onClick={this.handleUpdateUrgent}>Sauvegarder</button>
              </div>
            )}
          </section>
        </div>
        <button onClick={this.handleLogout}>Se déconnecter</button>
      </div>
    );
  }
}
const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation(AdminUrgent);

