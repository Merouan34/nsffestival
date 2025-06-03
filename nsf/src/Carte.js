import React, { useState, useEffect, Component } from 'react';
import './Carte.css';
import Entete from './Entete';
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import PuffLoader from "react-spinners/PuffLoader";
import CardSelectBox from "./CardSelectBox.js";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Fonction pour obtenir une icône personnalisée
const getCustomIcon = (type) => {
    return new Icon(iconMappings[type] || iconMappings.scene || iconMappings.wc);
};

// Icônes mappées par type
export const iconMappings = {
  position: {
    iconUrl: "https://cdn-icons-png.freepik.com/512/684/684908.png",
    iconSize: [50, 50],
  },
  scene: {
    iconUrl: "https://cdn-icons-png.freepik.com/512/6909/6909892.png",
    iconSize: [50, 50],
  },
  wc: {
    iconUrl: "https://cdn-icons-png.freepik.com/512/75/75117.png",
    iconSize: [50, 50],
  },
  snack: {
    iconUrl: "https://cdn-icons-png.freepik.com/256/657/657481.png",
    iconSize: [50, 50],
  },
  buvette: {
    iconUrl: "https://cdn-icons-png.freepik.com/256/3330/3330673.png",
    iconSize: [50, 50],
  },
};

function LocateControl() {
  const map = useMap();

  const handleLocateClick = () => {
    map.locate();
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

function LocationMarker({ setUserLocation }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.on('locationfound', (e) => {
      setPosition(e.latlng);
      setUserLocation(e.latlng);
    });
  }, [map, setUserLocation]);

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
      isLoading: true,
      userLocation: null,
      route: null
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.calculateRoute = this.calculateRoute.bind(this);
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

  async calculateRoute(destination) {
    const { userLocation } = this.state;
    if (!userLocation) return;

    const start = `${userLocation.lng},${userLocation.lat}`;
    const end = `${destination[1]},${destination[0]}`; // Inverser lat/lon pour OSRM

    try {
      const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`);
      const route = response.data.routes[0];
      const routeCoordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]); // Inverser lon/lat pour Leaflet

      this.setState({ route: routeCoordinates });
    } catch (error) {
      console.error('Erreur lors du calcul de l\'itinéraire:', error);
    }
  }

  render() {
    const { mappost, isLoading, route, userLocation } = this.state;
    
    return (
      <div>
        <Entete titre='Carte - NSF'/>
        <CardSelectBox onSelect={this.handleTypeChange} />
        <div className='mapwrapper'> 
          {isLoading ? 
            <PuffLoader
              color='orange'
              loading={true}
              size={250}
              cssOverride={{ display: 'block', margin: 'auto' }}
            />
          :
          <MapContainer id='map' center={[43.654286, 3.9304198]} zoom={17} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />  
            <LocateControl />
            <LocationMarker setUserLocation={(location) => this.setState({ userLocation: location })} />
            {mappost.length && mappost.map((lieu, index) => (
              <Marker
                key={index}
                position={lieu.LattLieu.split(',')}
                icon={getCustomIcon(lieu.typeLieu)}
                eventHandlers={{
                  click: () => this.calculateRoute(lieu.LattLieu.split(',')) // Calcule l'itinéraire lorsqu'un marqueur est cliqué
                }}
              >
                <Popup>
                  {lieu.nomLieu} <br />
                </Popup>
              </Marker>
            ))}
            {route && (
              <Polyline positions={route} color="blue" />
            )}
          </MapContainer>
          }
        </div>
        {route && (
          <div>
            <h3>Itinéraire</h3>
            <p>Distance: {route.distance} mètres</p>
            <p>Durée: {Math.round(route.duration / 60)} minutes</p>
          </div>
        )}
      </div>
    );
  }
}

export default Carte;
