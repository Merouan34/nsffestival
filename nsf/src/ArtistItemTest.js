import React,{useState,handleClick,useRef} from 'react'
import {images} from './constants/index'
import './ArtistItem.css';
import {data} from './constants/index';
import { ImCross } from "react-icons/im";
import Entete from './Entete';
import SinglePost from './SinglePost';
import SingleImage from './SingleImage';
import Title from './Title';



const List = ({}) => {

  const [clickedData, setClickedData] = useState('');
  const [clickedData1, setClickedData1] = useState('');

  const handleMultipleClicks = (e) => {
    handleClick1(e);
    toggleModal();
    
  };

  const handleClick1 = (e) => {
   
    const data1 = document.getElementById(e.target.id+'s');
   
    var data2= data1; 
    

    
    setClickedData1(data2.outerHTML);

    const data = document.getElementById(e.target.id).src;
    setClickedData(data);
  }
  const [classState, setClassState] = useState('modal-content');
  const [modal, setModal] = useState(false);

  const toggleModal = () => {

    setModal(!modal);

    if(!modal) {
    setTimeout(() => {
      setClassState('modal-content active');
    }, 100);
  }else{
    setClassState('modal-content');
  }
  };

  if(modal) {
    document.body.classList.add('active-modal')
    
   
  } else {
    document.body.classList.remove('active-modal')
    
  }
  
 

    return(
    <div>
      <div class="card">
            <div className='artistcard'>
              <SingleImage onClick={handleMultipleClicks}/>
              </div>
            <div class='ghost' id='enteteartist'>
               <SinglePost/>
 
        </div>
        
        {
            
        modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
              <div className={classState}>
                  <img src={clickedData} class="infoimgcard"/>
                  <ul >
                      <div dangerouslySetInnerHTML={{ __html:clickedData1 }}></div>
                  </ul>
                  <a id='closecard'className="close-modal"  onClick={toggleModal}>
                  <ImCross />
                </a>
              </div>  
              </div>
        
        )}
        
        </div>
        </div>
      )
    }
    
const ArtistItemTest = () => {

    return(
      <>
        <Entete titre='PROGRAMMATION'/>
        <Title texte='Cliquez sur les artistes pour en savoir plus !'/>
          <List />
      </>
  )
}
export default ArtistItemTest
