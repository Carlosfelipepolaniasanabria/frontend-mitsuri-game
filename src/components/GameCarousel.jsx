import React from "react";

function GameCarousel({ games, activeIndex, isSpinning }) {
  if (games.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay juegos todavía</h3>
        <p>Agrega tu primer videojuego para activar el carrusel.</p>
      </div>
    );
  }

  return (
    <section className="carousel-wrapper">
      <div className="carousel-window">
        <div
          className={`carousel-track ${isSpinning ? "is-spinning" : ""}`}
          style={{
            transform: `translateX(calc(50% - ${activeIndex * 260}px - 130px))`
          }}
        >
          {games.map((game, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={game.id}
                className={`carousel-card ${isActive ? "active-carousel-card" : ""}`}
              >
                <img
                  src={game.urlImagen}
                  alt={game.nombre}
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://placehold.co/600x400/f9bfd4/ffffff?text=Juego";
                  }}
                />

                <div className="carousel-card-content">
                  <h3>{game.nombre}</h3>
                  <span>{game.plataforma}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="carousel-pointer">
        <span>🌸</span>
      </div>
    </section>
  );
}

export default GameCarousel;