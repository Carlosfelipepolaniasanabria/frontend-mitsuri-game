import React, { useState } from "react";
import { authService } from "../services/authService";

function AuthForm({ onAuthSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const title = isLoginMode ? "Bienvenida" : "Crear cuenta";
  const buttonText = isLoginMode ? "Entrar" : "Registrarme";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (isLoginMode) {
        const data = await authService.login(form);
        onAuthSuccess(data.user);
      } else {
        await authService.register(form);
        setMessage("Cuenta creada. Ahora puedes iniciar sesión.");
        setIsLoginMode(true);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
  <main className="auth-page">
    <section className="auth-layout-card">
      <div className="auth-image-side">
        <img
          src="https://static.wikia.nocookie.net/p__/images/8/82/Mitsuri_Kanroji_Render.png/revision/latest?cb=20250111172156&path-prefix=protagonist"
          alt="Personaje estilo Mitsuri"
          className="auth-side-character"
        />

        
      </div>

      <div className="auth-form-side">
        <div className="brand-badge">🌸 Game Picker</div>

        <h1>{title}</h1>

        <p className="auth-subtitle">
          {isLoginMode
            ? "Inicia sesión con tu cuenta"
            : "Crea tu cuenta para guardar tus videojuegos favoritos"}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Usuario
            <input
              type="text"
              name="username"
              placeholder="Escribe tu usuario"
              value={form.username}
              onChange={handleChange}
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="primary-button">
            {buttonText}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <button
          className="ghost-button"
          onClick={() => {
            setIsLoginMode((prev) => !prev);
            setMessage("");
          }}
        >
          {isLoginMode
            ? "No tengo cuenta, registrarme"
            : "Ya tengo cuenta, iniciar sesión"}
        </button>
      </div>
    </section>
  </main>
);
}

export default AuthForm;