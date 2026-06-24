import React from "react";

function PlatformSelector({ username, onSelectPlatform, onLogout }) {
  return (
    <main className="platform-page">
      <header className="topbar">
        <div>
          <p className="mini-text">Sesión activa</p>
          <h2>Hola, {username}</h2>
        </div>

        <button className="outline-button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </header>

      <section className="hero-section">
        <h1>Elige tu plataforma</h1>
        <p>
          Selecciona dónde quieres jugar y deja que la ruleta decida por ti.
        </p>
      </section>

      <section className="platform-grid">
        <button
          className="platform-card"
          onClick={() => onSelectPlatform("PC")}
        >
          <span className="platform-icon">💻</span>
          <h3>Juegos de Computador</h3>
          <p>Perfecto para tus juegos de PC, Steam, Epic o navegador.</p>
        </button>

        <button
          className="platform-card"
          onClick={() => onSelectPlatform("PlayStation")}
        >
          <span className="platform-icon">🎮</span>
          <h3>PlayStation</h3>
          <p>Guarda tus exclusivos, aventuras y juegos favoritos de consola.</p>
        </button>
      </section>
    </main>
  );
}

export default PlatformSelector;