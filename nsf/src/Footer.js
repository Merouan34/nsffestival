import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube,FiLinkedin} from 'react-icons/fi';

import './Footer.css';

const Footer = () => (
  <div className="app__footer section__padding" id="login">
    <div className="app__footer-links">
      <div className="app__footer-links_logo">
        <p className="p__opensans">N'hésitez pas à nous suivre sur ces plateformes !</p>
        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiTwitter />
          <FiInstagram />
          <FiYoutube/>
          <FiLinkedin/>
        </div>
      </div>
    </div>

    <div className="footer__copyright ">
      <p className="p__opensans">2023. Tous droit réservés | Mentions légales | Politique de confidentialité | Conditions générales | Accessibilité</p>
    </div>

  </div>
);

export default Footer;