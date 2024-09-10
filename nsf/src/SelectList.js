import React, { Component } from 'react';
import './ArtistItem.css'; // Assurez-vous que ce fichier contient le CSS fourni

export default class SelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valeurSelectionnee: "1",
            justClicked: null
        };
    }

    handleSelect = (e) => {
        const nouvelleValeur = e.target.value;
        this.setState({ valeurSelectionnee: nouvelleValeur });
        const { onSelect } = this.props;
        onSelect(e);
    }

    render() {
        return (
            <div className='dropdown-container'>
                <select
                    className='dropdown-select'
                    value={this.state.valeurSelectionnee}
                    onChange={(e) => this.handleSelect(e)}
                >
                    <option className='dropdown-option' value=''>Tous les artistes</option>
                    <option className='dropdown-option' value='typeMusique=rap'>Rap</option>
                    <option className='dropdown-option' value='typeMusique=rock'>Rock&Roll</option>
                    <option className='dropdown-option' value='typeMusique=funk'>Funk</option>
                    <option className='dropdown-option' value='typeMusique=classique'>Classique</option>
                </select>
            </div>
        );
    }
}
