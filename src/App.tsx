import { useState } from 'react'
import { CATEGORIES } from './data/categories'
import Sidebar from "./components/layout/Sidebar"
import MapView from "./components/map/MapView"
import AuthPage from "./components/login/AuthPage"
import type { User } from "./data/user"

function App() {
  const [radius, setRadius] = useState(10)
  const [filters, setFilters] = useState(
    Object.fromEntries(
      CATEGORIES.map(c => [c.id, true])
    )
  ) 

  type SidebarMode =
    | { type: 'default' }
    | { type: 'edit-category'; categoryId: string }
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>({
    type: 'default',
  })
  
  const [user, setUser] = useState<User | null>(null)

  //DEV HANDLER LOGINU 
  const handleLogin = async (data: { email: string; password: string }) => {
  setUser({
    email: data.email,
    username: "DevUser",
    routes: [],
  })
}
  //HANDLER LOGINU DOCELOWY
  // const handleLogin = async (data: { email: string; password: string }) => {
  //   const response = await fetch("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })

  //   if (!response.ok) {
  //     throw new Error("Błąd logowania")
  //   }

  //   const result = await response.json()
  //   // result = { username, email, routes }

  //   setUser(result)
  // }


  const handleRegister = async (data: {
      email: string
      username: string
      password: string
    }) => {
      // await api.register(...)
    setUser({
      email: data.email,
      username: data.username,
      routes: [],
    })
  }

  return (
    <>
      {!user ? (
        <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar
          user={user}
          onLogout={() => setUser(null)}
          radius={radius}
          filters={filters}
          onRadiusChange={setRadius}
          onFiltersChange={setFilters}
          sidebarMode={sidebarMode}
          setSidebarMode={setSidebarMode}
        />
        <MapView radius={radius} filters={filters} />
      </div>) 
      }
    </>
  )
}

export default App
