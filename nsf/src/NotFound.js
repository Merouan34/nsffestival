import { Link } from "react-router-dom";
import './NotFound.css'


export default function NotFound() {
    return (
        <div className="errorstyle">
            <h1 className="error">404</h1>
            <p className="errortitle">Désolé, page introuvable...</p>
            <Link to='/'><button type="button" className="home_button">Accueil</button></Link>
        </div>
    )
}