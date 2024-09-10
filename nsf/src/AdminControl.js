import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminControl.css';
import Breadcrumb from './breadcrumb';

class AdminControl extends Component {
  state = {
    username: localStorage.getItem('username') || 'Administrateur',
    data: {
      artists: [],
      cards: [],
      news: [],
      planning: [],
      urgent: [],
      users: [],
    },
    newArtist: { 
      nomArtist: '', 
      descriptionArtist: '', 
      Img: '',
      typeMusique: '',
      jour: '',
      heureDebut: '',
      heureFin: '',
      nomScene: ''
    },
    editingArtistId: '',
    editingArtist: ''
  };
  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    this.props.navigate('/login');
  };
  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = async () => {
    const endpoints = ['artists', 'cards', 'news', 'planning', 'urg'];
    const allData = {};

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        allData[endpoint] = data;
      } catch (error) {
        console.error(`Erreur lors de la récupération de ${endpoint}:`, error);
      }
    }

    this.setState({ data: allData });
  };

  handleInputChange = (e, key) => {
    this.setState({
      newArtist: {
        ...this.state.newArtist,
        [key]: e.target.value,
      },
    });
  };

  handleAddArtist = async () => {
    const { newArtist } = this.state;
    if (Object.values(newArtist).some(value => value === '')) {
      alert('Tous les champs doivent être remplis.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newArtist),
      });

      if (response.ok) {

        const planningData = {
          nomArtist: newArtist.nomArtist,
          jour: newArtist.jour,
          heureDebut: newArtist.heureDebut,
          heureFin: newArtist.heureFin,
          nomScene: newArtist.nomScene

        };
        
        const planningResponse = await fetch('http://localhost:5000/api/planning', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(planningData),
        });

        if (planningResponse.ok) {
          this.fetchAllData();
        } else {
          console.error('Erreur lors de l\'ajout dans la collection planning');
        }
      } else {
        console.error('Erreur lors de l\'ajout de l\'artiste');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'artiste:', error);
    }
  };

  handleEditArtist = (artist) => {
    // Assurez-vous que les données de planning sont correctement intégrées
    this.setState({ 
      editingArtistId: artist._id, 
      editingArtist: {
        nomArtist: artist.nomArtist,
        descriptionArtist: artist.descriptionArtist,
        Img: artist.Img,
        typeMusique: artist.typeMusique,
        jour: artist.planning?.jour || '', // Assurez-vous que les données sont correctement définies
        heureDebut: artist.planning?.heureDebut || '',
        heureFin: artist.planning?.heureFin || '',
        nomScene: artist.planning?.nomScene || ''
      } 
    });
  };

  handleUpdateArtist = async () => {
    const { editingArtistId, editingArtist } = this.state;
  
    try {
      // Mettre à jour l'artiste dans la collection 'artists'
      const response = await fetch(`http://localhost:5000/api/artists/${encodeURIComponent(editingArtistId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editingArtist),
      });
  
      if (response.ok) {
        // Mettre à jour les informations de planning dans la collection 'planning'
        const planningData = {
          nomArtist: editingArtist.nomArtist,
          jour: editingArtist.jour,
          heureDebut: editingArtist.heureDebut,
          heureFin: editingArtist.heureFin,
          nomScene: editingArtist.nomScene // Assurez-vous que la clé correspond à celle dans la DB
        };
  
        const planningResponse = await fetch(`http://localhost:5000/api/planning/${encodeURIComponent(editingArtist.nomArtist)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(planningData),
        });
  
        if (planningResponse.ok) {
          this.fetchAllData(); // Rafraîchir les données après la modification
          this.setState({editingArtistId: null})
          const confirmation = window.confirm('Modifié !');
         
        } else {
          console.error('Erreur lors de la mise à jour de la collection planning');
        }
      } else {
        console.error('Erreur lors de la modification de l\'artiste',);
      }
    } catch (error) {
      console.error('Erreur lors de la modification de l\'artiste:', error);
    }
  };
  
  handleDeleteArtist = async (id) => {
    const confirmation = window.confirm('Supprimer ?');
  
    if (!confirmation) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/artists/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        this.fetchAllData(); // Rafraîchir les données après la suppression
      } else {
        console.error('Erreur lors de la suppression de l\'artiste');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'artiste:', error);
    }
  };
  handleEditInputChange = (e, key) => {
    this.setState({
      editingArtist: {
        ...this.state.editingArtist,
        [key]: e.target.value,
      },
    });
  };

  render() {
    const { artists, planning } = this.state.data;
    const { newArtist, editingArtist, editingArtistId } = this.state;


    const artistsWithPlanning = artists.map((artist) => {
      const artistPlanning = planning.find((plan) => plan.nomArtist === artist.nomArtist) || {};
      return { ...artist, planning: artistPlanning };
    });

    return (
      <div className="admin-control">
  <h1>Administration</h1>
  <Breadcrumb
          paths={[
            { href: '/admin-accueil', label: 'Accueil' },
            { href: '/admin-control', label: 'Admin Artistes' },
          ]}
        />
  <div className="admin-content">
    {/* Section de données des artistes */}
    <section className="artist-data">
      <h2>Artistes</h2>
      <ul>
        {artistsWithPlanning.map((artist) => (
          <li key={artist._id}>
            <strong>{artist.nomArtist}</strong> - {artist.descriptionArtist} - {artist.Img} - {artist.typeMusique}
            <br />
            <em>
              Jour: {artist.planning.jour || 'Non défini'}, 
              Heure de début: {artist.planning.heureDebut || 'Non défini'}, 
              Heure de fin: {artist.planning.heureFin || 'Non défini'}, 
              Scène: {artist.planning.nomScene || 'Non définie'}
            </em>
            <br />
            <button onClick={() => this.handleEditArtist(artist)}>Modifier</button>
            <button onClick={() => this.handleDeleteArtist(artist._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </section>

    {/* Section de formulaire de création et de modification d'artistes */}
    <section className="artist-form">
      <h3>Ajouter un nouvel artiste</h3>
      <input
        type="text"
        placeholder="Nom de l'artiste"
        value={newArtist.nomArtist}
        onChange={(e) => this.handleInputChange(e, 'nomArtist')}
        required
      />
      <input
        type="text"
        placeholder="Lien image"
        value={newArtist.Img}
        onChange={(e) => this.handleInputChange(e, 'Img')}
        required
      />
      <input
        type="text"
        placeholder="Type de musique"
        value={newArtist.typeMusique}
        onChange={(e) => this.handleInputChange(e, 'typeMusique')}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={newArtist.descriptionArtist}
        onChange={(e) => this.handleInputChange(e, 'descriptionArtist')}
        required
      />
      <input
        type="text"
        placeholder="Jour"
        value={newArtist.jour}
        onChange={(e) => this.handleInputChange(e, 'jour')}
        required
      />
      <input
        type="text"
        placeholder="Heure de début"
        value={newArtist.heureDebut}
        onChange={(e) => this.handleInputChange(e, 'heureDebut')}
        required
      />
      <input
        type="text"
        placeholder="Heure de fin"
        value={newArtist.heureFin}
        onChange={(e) => this.handleInputChange(e, 'heureFin')}
        required
      />
      <input
        type="text"
        placeholder="Scène"
        value={newArtist.nomScene}
        onChange={(e) => this.handleInputChange(e, 'nomScene')}
        required
      />
      <button onClick={this.handleAddArtist}>Ajouter</button>

      {editingArtistId && (
        <div>
          <h3>Modifier l'artiste</h3>
          <input
            type="text"
            placeholder="Nom de l'artiste"
            value={editingArtist.nomArtist}
            onChange={(e) => this.handleEditInputChange(e, 'nomArtist')}
            required
          />
          <input
            type="text"
            placeholder="Lien image"
            value={editingArtist.Img}
            onChange={(e) => this.handleEditInputChange(e, 'Img')}
            required
          />
          <input
            type="text"
            placeholder="Type de musique"
            value={editingArtist.typeMusique}
            onChange={(e) => this.handleEditInputChange(e, 'typeMusique')}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={editingArtist.descriptionArtist}
            onChange={(e) => this.handleEditInputChange(e, 'descriptionArtist')}
            required
          />
          <input
            type="text"
            placeholder="Jour"
            value={editingArtist.jour}
            onChange={(e) => this.handleEditInputChange(e, 'jour')}
            required
          />
          <input
            type="text"
            placeholder="Heure de début"
            value={editingArtist.heureDebut}
            onChange={(e) => this.handleEditInputChange(e, 'heureDebut')}
            required
          />
          <input
            type="text"
            placeholder="Heure de fin"
            value={editingArtist.heureFin}
            onChange={(e) => this.handleEditInputChange(e, 'heureFin')}
            required
          />
          <input
            type="text"
            placeholder="Scène"
            value={editingArtist.nomScene}
            onChange={(e) => this.handleEditInputChange(e, 'nomScene')}
            required
          />
          <button onClick={this.handleUpdateArtist}>Sauvegarder</button>
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

export default withNavigation(AdminControl);
