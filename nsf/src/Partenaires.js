import React, { Component } from 'react'
import Entete from './Entete'
import './Partenaires.css'
import PuffLoader from "react-spinners/PuffLoader";
const apiUrl = process.env.REACT_APP_API_URL;

const override = {
    display: "block",
    margin: "auto", 
};

export default class Partenaires extends Component {
  constructor( props) {
		super( props );
       
		this.state = {
			post: {},
      media: {},
      isLoading:true,
      partenaires: [],
      loading: true,
      error: null,     
		};
        
	}
  componentDidMount() {
    this.fetchPartenaires();
  }

  fetchPartenaires = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/partenaires`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des partenaires');
      }
      const data = await response.json();
      this.setState({ partenaires: data, loading: false });
      this.setState({isLoading:false})
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };
    render() {
      const { partenaires, loading, error } = this.state;

      if (loading) return <p>Chargement des partenaires...</p>;
      if (error) return <p>{error}</p>;
  
    console.log()
    return (
      <>
      <Entete titre='Nos partenaires'/>
      <div className="partenaires-container">
        <div className="partenaires-list">
        {this.state.isLoading? 
                    <PuffLoader
                    color='orange'
                    loading='true'
                    size={250}
                    cssOverride={override}
                    />
              
                :
          partenaires.map(partenaire => (
            <div key={partenaire._id} className="partenaire-card">
              <img src={partenaire.Img} alt={partenaire.nomPartenaire} className="partenaire-logo" />
              <div className="partenaire-info">
                <h2>{partenaire.nomPartenaire}</h2>
                <p>{partenaire.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
    );
  }
}

