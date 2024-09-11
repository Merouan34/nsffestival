
import React,{ Component, CSSProperties }  from 'react'
import './ArtistItem.css';
import SelectList from './SelectList'
import PuffLoader from "react-spinners/PuffLoader";
const apiUrl = process.env.REACT_APP_API_URL;

const override = {
    display: "block",
    margin: "auto", 

};

class SingleImage extends Component { 
    
        handleClick = (e) => {
            const { onClick,id } = this.props;
            onClick(e)
            ;}

    constructor( props) {
		super( props );
       
		this.state = {
			post: {},
            media: {},
            valeurSelectionnee: "1",
            justClicked : null,
            isLoading:true
              
		};
        this.handleValeurChange = (e) => {
            const nouvelleValeur = e.target.value;
            this.setState({ valeurSelectionnee: nouvelleValeur }, () => {
              this.componentDidMount(); 
            });
          };
	}
   
    async componentDidMount() {


        const w = await fetch(`${apiUrl}/api/artists?${this.state.valeurSelectionnee}`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        ;
        const d = await w.json();
        this.setState({ media: d });
        this.setState({isLoading:false})
        
    }
    
    render() {

    const onClick = this.props;
    const media = this.state.media;
 
    return(
            <div> 
            
                
                 <SelectList onSelect={(e)=>this.handleValeurChange(e)}/>

                
                {this.state.isLoading? 
                    <PuffLoader
                    color='orange'
                    loading='true'
                    size={250}
                    cssOverride={override}
                    />
              
                :

                    media.length && (media.map(media => (
                        
                        <img
                            key={media._id}
                            id={media._id}
                            className='imgcard'
                            src={media.Img}
                            onClick={(e)=>this.handleClick(e)}
                            />
                        
                        )))
                        }
           
            </div >
  );
}

;
}

export default SingleImage;