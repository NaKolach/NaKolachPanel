import { useState } from 'react'
import AuthPage from "./components/AuthPage";
import MapComponent from './components/MapComponent';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
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
