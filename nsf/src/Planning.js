import React, { Component } from 'react'
import './planning.css'
import Entete from './Entete';
import Title from './Title';
import PuffLoader from "react-spinners/PuffLoader";
import SelectBox from './SelectBox.js';
const apiUrl = process.env.REACT_APP_API_URL;

const override = {
    display: "block",
    margin: "auto", 

};

export default class Planning extends Component {
  constructor( props) {
		super( props );
       
		this.state = {
			post: {},
      isLoading:true,
      joursSelectionnes: "",
      joursSelectionnesStr: "",
    }
  }
  handleSelectChange = (joursSelectionnes) => {

    
    const joursSelectionnesStr = joursSelectionnes.join(',');
    this.setState({ joursSelectionnes: joursSelectionnesStr });
    
    this.setState({ joursSelectionnes });
    this.setState({ joursSelectionnes: joursSelectionnesStr }, () => {
      this.componentDidMount();
    });
  };
  


  async componentDidMount() {

    const url = this.state.joursSelectionnes=="" ?`${apiUrl}/api/planning` :`${apiUrl}/api/planning?jour=${this.state.joursSelectionnes}` ; 
        
    const w = await fetch(url, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log()
    ;
    const d = await w.json();
    this.setState({ post: d });
    this.setState( {isLoading:false})
    
  
  }
  render() {
    const post = this.state.post;
    
    return (
      <>
  <Entete titre={'PLANNING'} />
  <Title texte='Retrouvez les horaires de vos artistes favoris !' />
  <SelectBox onSelect={this.handleSelectChange} />
  
  <div className='bg'> 
    <h2 className='jour'>
      {this.state.joursSelectionnes.length > 0 ? `${this.state.joursSelectionnes}` : 'Tous les jours'}
    </h2>
    
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Artistes</th>
          <th>Heure de début</th>
          <th>Heure de fin</th>
          <th>Scène</th>
        </tr>
      </thead>
      <tbody>
        {this.state.isLoading ? (
          <PuffLoader
            color='orange'
            loading={true}
            size={250}
            cssOverride={override}
          />
        ) : (
          post.length && post.map(post => (
            <tr key={post.nomArtist}>
              <td>{post.nomArtist}</td>
              <td>{post.heureDebut}</td>
              <td>{post.heureFin}</td>
              <td>{post.nomScene}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</>
    )
  }
}


 
    

 



