import React, { useState, Component } from 'react';
import './Carte.css';
import Entete from './Entete';
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import PuffLoader from "react-spinners/PuffLoader";
import CardSelectBox from "./CardSelectBox.js";

const apiUrl = process.env.REACT_APP_API_URL;

const override = {
    display: "block",
    margin: "auto", 
};

// Fonction pour obtenir une icône personnalisée
const getCustomIcon = (type) => {
    return new Icon(iconMappings[type] || iconMappings.scene || iconMappings.wc);
};

// Icônes mappées par type
export const iconMappings = {
  position: {
    iconUrl: "https://cdn-icons-png.freepik.com/512/684/684908.png?uid=R146618042&ga=GA1.1.1841943442.1714140616",
    iconSize: [50, 50],
  },
  scene: {
    iconUrl: "https://cdn-icons-png.freepik.com/512/6909/6909892.png?uid=R146618042&ga=GA1.1.1841943442.1714140616",
    iconSize: [50, 50],
  },
  wc: {
    iconUrl: "https://cdn-icons-png.freepik.com/512/75/75117.png?uid=R146618042&ga=GA1.1.1841943442.1714140616",
    iconSize: [50, 50],
  },
  snack: {
    iconUrl: "https://cdn-icons-png.freepik.com/256/657/657481.png?semt=ais_hybrid",
    iconSize: [50, 50],
  },
  buvette: {
    iconUrl: "https://cdn-icons-png.freepik.com/256/3330/3330673.png?semt=ais_hybrid",
    iconSize: [50, 50],
  },
}; 

function LocateControl() {
  const map = useMap(); // Utilisation du hook pour obtenir l'instance de la carte

  const handleLocateClick = () => {
    map.locate(); // Appelle la méthode de localisation de la carte
  };

  return (
    <button
      onClick={handleLocateClick}
      style={{
        fontFamily: 'Poppins', 
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '10px',
        backgroundColor: '#ff6600',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Me localiser
    </button>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  map.on('locationfound', (e) => {
    setPosition(e.latlng);
  });

  return position === null ? null : (
    <Marker 
      position={position}
      icon={getCustomIcon("position")}
    >
      <Popup>Vous êtes ici</Popup>
    </Marker>
  );
}

class Carte extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      mappost: {},
      cards: {},
      selectedType: '',
      isLoading: true
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(selectedType) {
    const Typecard = selectedType.join(',');
    this.setState({ selectedType: Typecard }, () => {
      this.componentDidMount(); 
    });
  }

  async componentDidMount() {
    const url = this.state.selectedType === "" ? `${apiUrl}/api/cards` : `${apiUrl}/api/cards?typeLieu=${this.state.selectedType}`;
    const r = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const v = await r.json();
    this.setState({ mappost: v, isLoading: false });
  }

  render() {
    const mapPost = this.state.mappost;
    
    return (
      <div>
        <Entete titre='Carte - NSF'/>
        <CardSelectBox onSelect={this.handleTypeChange} />
        <div className='mapwrapper'> 
          {this.state.isLoading ? 
            <PuffLoader
              color='orange'
              loading={true}
              size={250}
              cssOverride={override}
            />
          :
          <MapContainer id='map' center={[43.654286,3.9304198]} zoom={17} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />  
            <LocateControl /> {/* Bouton Me localiser */}
            <LocationMarker /> {/* Affichage du marqueur de localisation */}
            {mapPost.length && mapPost.map((lieu, index) => (
              <Marker
                key={index}
                position={lieu.LattLieu.split(',')}
                icon={getCustomIcon(lieu.typeLieu)}
              >
                <Popup>
                  {lieu.nomLieu} <br />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          }
        </div>
      </div>
    )
  }
}

export default Carte;
