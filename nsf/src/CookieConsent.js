// CookieConsent.js
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './CookieConsent.css'; // Assurez-vous de créer ce fichier CSS

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifiez si le consentement aux cookies a été donné
    if (!cookies.cookieConsent) {
      setShowBanner(true);
    }
  }, [cookies.cookieConsent]);

  const handleAccept = () => {
    // Enregistrez le consentement aux cookies et fermez la bannière
    setCookie('cookieConsent', 'accepted', { path: '/' });
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Enregistrez le refus des cookies et fermez la bannière
    setCookie('cookieConsent', 'declined', { path: '/' });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <p>
        Ce site utilise des technologies comme les cookies ou le ciblage afin de personnaliser la publicité que vous voyez. Cela nous aide à vous montrer des publicités plus pertinentes et à améliorer votre expérience sur Internet. Nous l'utilisons également pour mesurer les résultats ou adapter le contenu de notre site Web. Puisque nous respectons votre vie privée, nous vous demandons votre autorisation pour utiliser ces technologies.
      </p>
      <div className="cookie-buttons">
        <button className="accept-button" onClick={handleAccept}>Accepter</button>
        <button className="decline-button" onClick={handleDecline}>Refuser</button>
      </div>
    </div>
  );
};

export default CookieConsent;
