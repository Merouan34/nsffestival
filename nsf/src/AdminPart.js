import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminControl.css'; // Assurez-vous de créer ce fichier CSS pour le style
import Breadcrumb from './breadcrumb'; // Assurez-vous que ce chemin est correct
const apiUrl = process.env.REACT_APP_API_URL;

class AdminPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') || 'Administrateur',
      partenaires: [], // Liste des partenaires récupérés
      newPartenaire: {
        nom: '',
        description: '',
        img: '',
      },
      editingPartenaireId: '',
      editingPartenaire: {
        nom: '',
        description: '',
        img: '',
      },
    };
  }

  componentDidMount() {
    this.fetchAllPartenaires();
  }

  // Fonction pour récupérer tous les partenaires
  fetchAllPartenaires = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/partenaires`);
      const data = await response.json();
      this.setState({ partenaires: data });
    } catch (error) {
      console.error("Erreur lors de la récupération des partenaires :", error);
    }
  };

  handleInputChange = (e, field) => {
    this.setState({
      newPartenaire: {
        ...this.state.newPartenaire,
        [field]: e.target.value,
      },
    });
  };

  handleEditInputChange = (e, field) => {
    this.setState({
      editingPartenaire: {
        ...this.state.editingPartenaire,
        [field]: e.target.value,
      },
    });
  };

  handleAddPartenaire = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/partenaires`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.newPartenaire),
      });

      if (response.ok) {
        this.fetchAllPartenaires(); // Rafraîchir la liste après l'ajout
        this.setState({
          newPartenaire: {
            nom: '',
            description: '',
            img: '',
          },
        });
      } else {
        console.error("Erreur lors de l'ajout du partenaire");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du partenaire :", error);
    }
  };

  handleEditPartenaire = (partenaire) => {
    this.setState({ 
      editingPartenaireId: partenaire._id, 
      editingPartenaire: {
        nom: partenaire.nom,
        description: partenaire.description,
        img: partenaire.img,
      } 
    });
  };

  handleUpdatePartenaire = async () => {
    const { editingPartenaireId, editingPartenaire } = this.state;

    try {
      const response = await fetch(`${apiUrl}/api/partenaires/${editingPartenaireId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPartenaire),
      });

      if (response.ok) {
        this.fetchAllPartenaires(); // Rafraîchir les données après la modification
        this.setState({
          editingPartenaireId: '',
          editingPartenaire: {
            nom: '',
            description: '',
            img: '',
          },
        });

        alert('Partenaire modifié avec succès !');
      } else {
        console.error('Erreur lors de la modification du partenaire');
      }
    } catch (error) {
      console.error('Erreur lors de la modification du partenaire :', error);
    }
  };

  handleDeletePartenaire = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/partenaires/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.fetchAllPartenaires(); // Rafraîchir la liste après la suppression
      } else {
        console.error("Erreur lors de la suppression du partenaire");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du partenaire :", error);
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    this.props.navigate('/login');
  };

  render() {
    const { partenaires, newPartenaire, editingPartenaireId, editingPartenaire } = this.state;

    return (
      <div className="admin-control">
        <h1>Gestion des Partenaires</h1>
        <Breadcrumb
          paths={[
            { href: '/admin-accueil', label: 'Accueil' },
            { href: '/admin-partenaires', label: 'Admin Partenaires' },
          ]}
        />
        <div className="admin-content">
          <section className="artist-data">
            <h2>Partenaires</h2>
            <ul>
              {partenaires.map((partenaire) => (
                <li key={partenaire._id}>
                  <img src={partenaire.img} alt={partenaire.nom} className="partenaire-logo" />
                  <div className="partenaire-info">
                    <strong>{partenaire.nom}</strong> - {partenaire.description}
                    <br />
                    <button onClick={() => this.handleEditPartenaire(partenaire)}>Modifier</button>
                    <button onClick={() => this.handleDeletePartenaire(partenaire._id)}>Supprimer</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="artist-form">
            <h3>Ajouter un nouveau partenaire</h3>
            <input
              type="text"
              placeholder="Nom"
              value={newPartenaire.nom}
              onChange={(e) => this.handleInputChange(e, 'nom')}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newPartenaire.description}
              onChange={(e) => this.handleInputChange(e, 'description')}
              required
            />
            <input
              type="text"
              placeholder="URL de l'image"
              value={newPartenaire.img}
              onChange={(e) => this.handleInputChange(e, 'img')}
              required
            />
            <button onClick={this.handleAddPartenaire}>Ajouter</button>

            {editingPartenaireId && (
              <div>
                <h3>Modifier le partenaire</h3>
                <input
                  type="text"
                  placeholder="Nom"
                  value={editingPartenaire.nom}
                  onChange={(e) => this.handleEditInputChange(e, 'nom')}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={editingPartenaire.description}
                  onChange={(e) => this.handleEditInputChange(e, 'description')}
                  required
                />
                <input
                  type="text"
                  placeholder="URL de l'image"
                  value={editingPartenaire.img}
                  onChange={(e) => this.handleEditInputChange(e, 'img')}
                  required
                />
                <button onClick={this.handleUpdatePartenaire}>Sauvegarder</button>
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

export default withNavigation(AdminPart);

