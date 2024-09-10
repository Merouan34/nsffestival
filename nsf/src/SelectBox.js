import React, { Component } from 'react'
import './SelectBox.css'


export default class SelectBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        joursSelectionnes: [] // Tableau pour stocker les jours sélectionnés
      };
    }
  
    handleCheckboxChange = (e) => {
      const { joursSelectionnes } = this.state;
      const { onSelect } = this.props;
      const valeur = e.target.value;
  
      // Si le jour est déjà sélectionné, on le retire, sinon on l'ajoute
      const nouvelleSelection = joursSelectionnes.includes(valeur)
        ? joursSelectionnes.filter(jour => jour !== valeur)
        : [...joursSelectionnes, valeur];
  
      this.setState({ joursSelectionnes: nouvelleSelection });
  
      // Appeler la fonction de rappel pour passer la sélection à l'extérieur
      onSelect(nouvelleSelection);
    };
  
    render() {
      return (
        <div className="select-box-container">
          <div class="checkbox-wrapper">
         
          <div>
            <label>
              <input
                type="checkbox"
                value="vendredi"
                onChange={this.handleCheckboxChange}
              />
              Vendredi
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="samedi"
                onChange={this.handleCheckboxChange}
              />
              Samedi
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="dimanche"
                onChange={this.handleCheckboxChange}
              />
              Dimanche
            </label>
          </div>
          </div>
        </div>
      );
    }
  }
