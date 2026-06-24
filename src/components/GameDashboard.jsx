import React, { useEffect, useMemo, useState } from "react";
import { gameService } from "../services/gameService";
import GameForm from "./GameForm";
import GameCarousel from "./GameCarousel";
import RandomSelector from "./RandomSelector";

function GameDashboard({ platform, onBack, onLogout }) {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState("");

  const filteredGames = useMemo(() => {
    return games.filter((game) => game.plataforma === platform);
  }, [games, platform]);

  const loadGames = async () => {
    try {
      const data = await gameService.getGames();
      setGames(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setSelectedGame(null);
  }, [platform]);

  const handleCreateGame = async (gameForm) => {
    try {
      const payload = {
        ...gameForm,
        plataforma: platform
      };

      const data = await gameService.createGame(payload);

      setGames((prev) => [...prev, data.game]);
      setMessage("Videojuego agregado correctamente.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSpinCarousel = () => {
    if (filteredGames.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setSelectedGame(null);
    setMessage("");

    const winnerIndex = Math.floor(Math.random() * filteredGames.length);

    let spins = 0;
    const totalSpins = filteredGames.length * 3 + winnerIndex + 1;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        return (prevIndex + 1) % filteredGames.length;
      });

      spins++;

      if (spins >= totalSpins) {
        clearInterval(interval);

        setTimeout(() => {
          setActiveIndex(winnerIndex);
          setSelectedGame(filteredGames[winnerIndex]);
          setIsSpinning(false);
        }, 220);
      }
    }, 120);
  };

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div>
          <p className="mini-text">Plataforma seleccionada</p>
          <h2>{platform}</h2>
        </div>

        <div className="topbar-actions">
          <button className="outline-button" onClick={onBack}>
            Cambiar plataforma
          </button>

          <button className="outline-button" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-layout">
        <aside className="side-panel">
          <GameForm onCreateGame={handleCreateGame} />

          <RandomSelector
            games={filteredGames}
            selectedGame={selectedGame}
            isSpinning={isSpinning}
            onSpin={handleSpinCarousel}
          />

          {message && <p className="message">{message}</p>}
        </aside>

        <section className="gallery-panel">
          <h1>Carrusel de {platform}</h1>

          <GameCarousel
            games={filteredGames}
            activeIndex={activeIndex}
            isSpinning={isSpinning}
          />
        </section>
      </section>
    </main>
  );
}

export default GameDashboard;