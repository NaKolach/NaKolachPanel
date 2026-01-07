import { useEffect, useState } from 'react'
import { CATEGORIES } from './data/categories'
import Sidebar from "./components/layout/Sidebar"
import MapView from "./components/map/MapView"
import AuthPage from "./components/login/AuthPage"
import type { User } from "./data/user"
import type { Category } from './data/category'
import type { PinColorKey } from './data/pinColors'
import type { BackendPlace } from "./data/backendPlace"

function App() {
  const [radius, setRadius] = useState(10)
  const [filters, setFilters] = useState(
    Object.fromEntries(
      CATEGORIES.map(c => [c.id, false])
    )
  ) 

  type SidebarMode =
    | { type: 'default' }
    | { type: 'edit-category'; category: string }
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>({
    type: 'default',
  })

  type LatLng = { lat: number; lng: number }

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
          lat: 54.37167,
          lng: 18.61236,
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

  const fetchCategory = async (category: string) => {
    if (!userLocation) return

    const params = new URLSearchParams()
    params.append("types", category)
    params.append("latitude", userLocation.lat.toString())
    params.append("longitude", userLocation.lng.toString())
    params.append("radius", (radius * 1720).toString())

    const res = await fetch(`http://nakolach.com/api/Places?${params}`)

    const data: BackendPlace[] = await res.json()

    setPlaces(prev => [
      ...prev.filter(p => p.category !== category),
      ...data
    ])
  }

  const removeCategoryPlaces = (category: string) => {
    setPlaces(prev => prev.filter(p => p.category !== category))
  }

  const toggleCategory = async (id: string) => {
    const next = !filters[id]
    setFilters(prev => ({ ...prev, [id]: next }))

    if (next) {
      await fetchCategory(id)
    } else {
      removeCategoryPlaces(id)
    }
  }

  const handleSearchRoute = async () => {
    if (!userLocation) return

    const params = new URLSearchParams()

    Object.entries(filters)
      .filter(([, v]) => v)
      .forEach(([id]) => params.append("types", id))

    params.append("latitude", userLocation.lat.toString())
    params.append("longitude", userLocation.lng.toString())
    params.append("radius", (radius * 1720).toString())


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
          onToggleCategory={toggleCategory}
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
