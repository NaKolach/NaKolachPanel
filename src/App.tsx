import { useState } from 'react'
import { CATEGORIES } from './data/categories'
import Sidebar from "./components/layout/Sidebar"
import MapView from "./components/map/MapView"
import AuthPage from "./components/login/AuthPage"
import type { User } from "./data/user"
import type { Category } from './data/category'
import type { PinColorKey } from './data/pinColors'

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
  const [categories, setCategories] = useState<Category[]>(CATEGORIES)

  //DEV HANDLER LOGINU 
  const handleLogin = async (data: { email: string; password: string }) => {
    setUser({
      email: data.email,
      username: "DevUser",
      routes: [],
    })
  }
  const updateCategoryColor = (id: string, color: PinColorKey) => {
    setCategories(prev =>
      prev.map(c =>
        c.id === id ? { ...c, pinColor: color } : c
      )
    )
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
          categories={categories}
          onSaveCategoryColor={updateCategoryColor}
        />

        <MapView
          radius={radius}
          filters={filters}
          categories={categories}
        />
      </div>) 
      }
    </>
  )
}

export default App
