import { useState } from 'react'
import { CATEGORIES } from './data/categories'
import Sidebar from "./components/layout/Sidebar"
import MapView from "./components/map/MapView"
import AuthPage from "./components/login/AuthPage"

function App() {
  const [radius, setRadius] = useState(10)
  const [filters, setFilters] = useState(
  Object.fromEntries(
    CATEGORIES.map(c => [c.id, true])
  )
)
  const [loggedIn, setLoggedIn] = useState(false);

  // funkcje debugujące formularze
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login data:", data);
    setLoggedIn(true);
  };

  const handleRegister = (data: { email: string; username: string; password: string }) => {
    console.log("Register data:", data);
    setLoggedIn(true);
  };

  return (
    // <>
    //   {!loggedIn ? (
    //     <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
    //   ) : (//TU WKLEIC STRONE GLOWNA JAK TESTOWAC LOGOWANIE) </>
    //}
    
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        radius={radius}
        filters={filters}
        onRadiusChange={setRadius}
        onFiltersChange={setFilters}
      />
      <MapView radius={radius} filters={filters} />
    </div>
      )
}

export default App
