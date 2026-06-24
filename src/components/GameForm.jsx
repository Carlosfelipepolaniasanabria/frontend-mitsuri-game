import React, { useState } from "react";

function GameForm({ onCreateGame }) {
  const [form, setForm] = useState({
    nombre: "",
    urlImagen: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onCreateGame(form);

    setForm({
      nombre: "",
      urlImagen: ""
    });
  };

  return (
    <section className="panel-card">
      <h3>Agregar videojuego</h3>

      <form className="game-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            placeholder="Ej: Minecraft"
            value={form.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          URL de imagen
          <input
            type="url"
            name="urlImagen"
            placeholder="Pega un enlace directo de imagen"
            value={form.urlImagen}
            onChange={handleChange}
          />
        </label>

        <button className="primary-button" type="submit">
          Guardar juego
        </button>
      </form>

      <p className="hint">
        Consejo: usa enlaces que terminen en .jpg, .png, .webp o una URL directa de imagen.
      </p>
    </section>
  );
}

export default GameForm;