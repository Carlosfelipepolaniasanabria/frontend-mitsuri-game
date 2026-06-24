import React from "react";

function RandomSelector({ games, selectedGame, isSpinning, onSpin }) {
  return (
    <section className="panel-card roulette-card">

      <p>
        Presiona el botón y el carrusel girará hasta escoger tu próximo juego.
      </p>

      <button
        className="roulette-button"
        onClick={onSpin}
        disabled={games.length === 0 || isSpinning}
      >
        {isSpinning ? "🌸 Girando..." : "🌸 Elegir al azar"}
      </button>

      {selectedGame && !isSpinning && (
        <div className="winner-box">
          <p>Juego elegido:</p>
          <strong>{selectedGame.nombre}</strong>
        </div>
      )}
    </section>
  );
}

export default RandomSelector;