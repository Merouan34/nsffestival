import React from 'react'
import Carte from './Carte';
import Navbar from './Navbar';
import Header from './Header';
import './App.css';
import ArtistItemTest from './ArtistItemTest';
import Entete from './Entete';
import Footer from './Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Planning from './Planning';
import Partenaires from './Partenaires';
import NotFound from './NotFound';
import Billetterie from './Billetterie';
import FAQ from './FAQ';
import Login from './Login'
import Register from './Register';
import Actualite from './Actualite';
import UserControl from './UserControl';
import AdminControl from './AdminControl';
import AdminAccueil from './AdminAccueil';
import AdminNouveautes from './AdminNouveautes';
import AdminUrgent from './AdminUrgent';
import AdminPart from './AdminPart';
const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="*" element={ <NotFound/> }/>
        <Route path="/" element={<Header/>}/>
        <Route path="/home" element={<Header/>}/>
        <Route path="/prog" element={<ArtistItemTest/>}/>
        <Route path="/planning" element={<Planning/>}/>
        <Route path="/billetterie" element={<Billetterie/>}/>
        <Route path="/carte" element={<Carte/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/partenaires" element={<Partenaires/>}/>
        <Route path="/actu" element={<Actualite/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-control" element={<UserControl />} />
        <Route path="/admin-control" element={<AdminControl />} />
        <Route path="/admin-accueil" element={<AdminAccueil />} />
        <Route path="/admin-nouveautes" element={<AdminNouveautes />} />
        <Route path="/admin-urgent" element={<AdminUrgent />} />
        <Route path="/admin-part" element={<AdminPart />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
