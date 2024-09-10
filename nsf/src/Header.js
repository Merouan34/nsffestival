import React from 'react';
import {images} from './constants/index'
import './Header.css';
import { NavLink } from 'react-router-dom';
import MessageUrgent from './MessageUrgent';
import Nouveaute from './Nouveaute';

const Header = () => (
 <div className="app__header app__wrapper section__padding" id="home">
  <MessageUrgent />
  <div className="app__wrapper_info flex__center">
    
   
    <div className="app__header-h1-wrapper">
      <h1 className="app__header-h1">BIENVENUE AU NATION SOUND FESTIVAL !</h1>
    </div>
  
    <div className="textdate">  
      Vendredi 1 mai - Samedi 2 mai - Dimanche 3 mai 
    </div>
    <div>
      <NavLink to="/billetterie">
        <button type="button" className="custom__button">Billetterie</button>
      </NavLink>
      <NavLink to="/prog">
        <button type="button" className="custom__button">Programmation</button>
      </NavLink>
      <NavLink to="/carte">
        <button type="button" className="custom__button">La carte</button>
      </NavLink>
    </div>
    <Nouveaute/> 
  </div> 
</div>

);

export default Header;