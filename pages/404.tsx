import React from 'react';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem', fontFamily: 'sans-serif' }}>
      <h1>404 - Page Non Trouvée / Pagina Niet Gevonden</h1>
      <p>La page que vous recherchez n'existe pas. / De pagina die u zoekt bestaat niet.</p>
      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ marginRight: '1rem', color: '#00adab' }}>Retour à l'accueil (FR)</a>
        <a href="/nl" style={{ color: '#00adab' }}>Terug naar home (NL)</a>
      </div>
    </div>
  );
}
