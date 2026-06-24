import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import PlatformSelector from "./components/PlatformSelector";
import GameDashboard from "./components/GameDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setSelectedPlatform(null);
  };

  if (!user) {
    return <AuthForm onAuthSuccess={setUser} />;
  }

  if (!selectedPlatform) {
    return (
      <PlatformSelector
        username={user.username}
        onSelectPlatform={setSelectedPlatform}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <GameDashboard
      platform={selectedPlatform}
      onBack={() => setSelectedPlatform(null)}
      onLogout={handleLogout}
    />
  );
}

export default App;