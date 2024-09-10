
import React ,{useState,Component} from 'react'
import './Carte.css'
import Entete from './Entete'
import L from 'leaflet'
import { Icon } from "leaflet";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import PuffLoader from "react-spinners/PuffLoader";
import CardSelectBox from "./CardSelectBox.js"
const override = {
    display: "block",
    margin: "auto", 

};



//Geolocalisation
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },

    locationfound(e) {
      setPosition(e.latlng)

    },
  })

  return position === null ? null : (
    <Marker 
    position={position}
     icon={getCustomIcon("position")}
    >
      <Popup>Vous êtes ici</Popup>
    </Marker>
  )
}

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

const getCustomIcon = (type) => {
    return new Icon(iconMappings[type] || iconMappings.scene || iconMappings.wc);
   };

class Carte extends Component { 
    
    constructor( props ) {
      super( props );
          
      this.state = {
        mappost: {},
        cards: {},
        selectedType: '',
        isLoading:true
      };
      this.handleTypeChange = (selectedType) => {
        const Typecard = selectedType.join(',');
        this.setState({ selectedType: Typecard });
        this.setState({ selectedType }, () => {
          this.componentDidMount(); 
        });
        
        ;
 
    }}

    async componentDidMount() {
     
      const url = this.state.selectedType ==""? `http://localhost:5000/api/cards`: `http://localhost:5000/api/cards?typeLieu=${this.state.selectedType}`; // Pas de filtre


      const r = await fetch(url,{
          mode: 'cors',
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      const v = await r.json();
      this.setState({ mappost : v });
      this.setState( {isLoading:false})
  }

 
render(){
  const mapPost = this.state.mappost;
  console.log(this.state.mappost)
  console.log(`http://localhost:5000/api/cards?typeLieu=${this.state.selectedType}`)
 
  return (
    <div>
      <Entete titre='Carte - NSF'/>
      <CardSelectBox onSelect={this.handleTypeChange} />
      <div className='mapwrapper'> 
        <div className='elemright'>
        </div>
        {this.state.isLoading? 
                    <PuffLoader
                    color='orange'
                    loading='true'
                    size={250}
                    cssOverride={override}
                    
                    />
              
                :
        <MapContainer id='map' center={[43.654286,3.9304198]} zoom={17} scrollWheelZoom={false}>
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker/>
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
export default Carte
