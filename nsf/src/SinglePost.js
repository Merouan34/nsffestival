
import { render } from '@testing-library/react';
import { useEffect, useState, useImg,  useRef } from 'react';
import React ,{Component}from 'react';
import { Class } from 'leaflet';
import './ArtistItem.css';
import './SinglePost.css';


class SinglePost extends Component {
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


        const w = await fetch(`http://localhost:5000/api/artists`, {
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
        console.log(this.state.media)
    
    return(

            <div>
                {media.length && (media.map(media => (
                    
                        <div id={media._id+'s'}>
                            <h2 className='posttitle'>{media.nomArtist}</h2>
                        <ul className='post'>
                            <li>{media.typeMusique}</li>
                        </ul>
                            <p className='postdescription'>{media.descriptionArtist}</p>
                        </div> 
                    
                    )))}
        </div >
);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//         <div>

//             {
//                   1 && (media.map(media => (
                 
//                         <div id={media.artistId+'s'}>
//                             <h2 className='posttitle'>{media.nomArtist}</h2>
//                         <ul className='post'>
//                             <li>{media.nomArtist}</li>
//                             <li>{media.artistId}</li>
//                         </ul>
//                             <p className='postdescription'>{media.descriptionArtist}</p>
//                         </div>
//                         )
//                     )
//                 )
//             }
           
//         </div >
// );
//     return(
//             <div>
    
//                 {
//                     post.length && (post.map(post => (
//                             <div id={post.featured_media+'s'}>
//                                 <h2 className='posttitle'>{post.title.rendered}</h2>
//                             <ul className='post'>
//                                 <li>{post.meta.type}</li>
//                                 <li>{post.meta.jour}</li>
//                                 <li>{(`${post.meta.coord[0]}`== '[43.654300,3.93340]'? 'La scène vers le squatepark':
//                                     (`${post.meta.coord[0]}`== '[43.654266,3.9285]'? 'La scène au bord du lac': 
//                                     (`${post.meta.coord[0]}`== '[43.655800,3.92950]'? 'La scène en haut': 
//                                     (`${post.meta.coord[0]}`== '[43.65440,3.9316]'? "La scène de l'ile au canard": 'Scène non defini'))))}</li>
//                                 <li>{post.meta.heure_de_passage}</li>  
//                             </ul>
//                                 <p className='postdescription'>{post.meta.description}</p>
//                             </div>
//                             )
//                         )
//                     )
//                 }
               
//             </div >
//   );
}

;
}

export default SinglePost;