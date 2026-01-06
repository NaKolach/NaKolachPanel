import { useEffect, useState } from 'react'
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

  type LatLng = { lat: number; lng: number }

  type BackendPlace = {
    id: number
    lat?: number
    lon?: number
    latitude?: number
    longitude?: number
    tags: Record<string, string>
  }

  const [places, setPlaces] = useState<BackendPlace[]>([])

  const [user, setUser] = useState<User | null>(null)
  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      () => {
        setUserLocation({
          lat: 54.3520,
          lng: 18.6466,
        })
      }
    )
  }, [])

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
  const handleSearchRoute = async () => {
    if (!userLocation) return

    const params = new URLSearchParams()

    Object.entries(filters)
      .filter(([, v]) => v)
      .forEach(([id]) => params.append("types", id))

    params.append("lat", userLocation.lat.toString())
    params.append("lon", userLocation.lng.toString())
    params.append("radius", (radius * 1000).toString())


    const res = await fetch(`http://nakolach.com/api/Places?${params.toString()}`)

    const responseJson = await res.json()
    setPlaces(responseJson)

    // console.log("[PLACES] status:", res.status)
    // console.log("[PLACES] response object:", responseJson)
    //console.log("[PLACES] response JSON string:", JSON.stringify(responseJson, null, 2))

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
          onSearchRoute={handleSearchRoute}
        />

        <MapView
          radius={radius}
          filters={filters}
          categories={categories}
          userLocation={userLocation}
          places={places}
        />
      </div>) 
      }
    </>
  )
}

export default App
