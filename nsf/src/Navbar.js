import { divIcon } from 'leaflet'
import React,{useState} from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoMoveToStart } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import './/Navbar.css'
import {images} from './constants/index'
import Nav from './Nav.js'

const Navbar = () => {
    const [toggleMenu, setToggleMenu]=useState(false);
    return (
    <nav class="navbar">
        <NavLink to="/">
            <li class="navbar-logo">
                <img src={images.logo} alt="logo"/>
            </li>
        </NavLink> 
        <ul class="navbar-links">
            <li class="p__opensans"><NavLink to="/home">Home</NavLink></li>
            <li class="p__opensans"><NavLink to="/prog">Programmation</NavLink></li>
            <li class="p__opensans"><NavLink to="/planning">Planning</NavLink></li>
            <li class="p__opensans"><NavLink to="/billetterie">Billetterie</NavLink></li>
            <li class="p__opensans"><NavLink to="/carte">Carte</NavLink></li>
            <li class="p__opensans"><NavLink to="/faq">FAQ</NavLink></li>
            <li class="p__opensans"><NavLink to="/partenaires">Partenaires</NavLink></li>
            <li class="p__opensans"><NavLink to="/actu">Actualité</NavLink></li>
        </ul>
            <li class="navbar-account">
                <Nav/>
            </li>
        <div class="navbar-small">
            <GiHamburgerMenu color="#FFF" class="overlay_close"fontSize={27}onClick={()=>setToggleMenu(true)}/>
            {toggleMenu &&(
            <div class="app__navbar-smallscreen_overlay flex__center slide-bottom">
                <GoMoveToStart fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
                <ul class="navbar-links-small">
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/home">Home</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/prog">Programmation</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/planning">Planning</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/billetterie">Billetterie</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/carte">Carte</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/faq">Foire aux questions</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/partenaires">Partenaires</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><NavLink to="/actu">Actualité</NavLink></li>
                    <li class="p__opensans"  onClick={() => setToggleMenu(false)}><Nav/></li>
                </ul>
            </div>
             )}
        </div>
    </nav>
        )
}

export default Navbar
