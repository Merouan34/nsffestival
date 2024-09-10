import React, { Component } from 'react';
import './SelectBox.css'

class CardSelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTypes: [] // Tableau pour les types sélectionnés
    };
  }

  handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let { selectedTypes } = this.state;

    if (checked) {
      // Ajouter le type sélectionné
      selectedTypes.push(value);
    } else {
      // Supprimer le type décoché
      selectedTypes = selectedTypes.filter(type => type !== value);
    }

    this.setState({ selectedTypes }, () => {
      // Appelle la fonction de rappel pour transmettre les types sélectionnés au composant parent
      this.props.onSelect(selectedTypes);
    });
  };

  render() {
    return (
      <div className="select-box-container">
         <div class="checkbox-wrapper">
    <label className="select-box-label">
        <input
            type="checkbox"
            value="scene"
            onChange={this.handleCheckboxChange}
            className="select-box-input"
        />{' '}
        Scène
    </label>
    <label className="select-box-label">
        <input
            type="checkbox"
            value="buvette"
            onChange={this.handleCheckboxChange}
            className="select-box-input"
        />{' '}
        Buvette
    </label>
    <label className="select-box-label">
        <input
            type="checkbox"
            value="wc"
            onChange={this.handleCheckboxChange}
            className="select-box-input"
        />{' '}
        Toilettes
    </label>
    <label className="select-box-label">
        <input
            type="checkbox"
            value="snack"
            onChange={this.handleCheckboxChange}
            className="select-box-input"
        />{' '}
        Snack
    </label>
    </div>
</div>
    );
  }
}

export default CardSelectBox;