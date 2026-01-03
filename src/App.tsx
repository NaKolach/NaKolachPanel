import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet"
import L from "leaflet"
import AuthPage from "./components/login/AuthPage";
import MapComponent from './components/map/MapComponent';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
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
    <>
      {!loggedIn ? (
        <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <>
          <div className="map-container" style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h2 style={{ textAlign: 'center' }}>Interactive Map Area</h2>
            {/* Możesz przekazać props np. initialZoom */}
            <MapComponent initialZoom={10} />
          </div>
          <div>
            
          </div>
          <h1 className="text-xl font-bold underline">
            Projekt GIS
          </h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      )}
    </>
  )
}

export default App
