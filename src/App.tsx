import { useEffect, useRef, useState } from "react"
import { CATEGORIES } from "./data/categories"
import Sidebar from "./components/layout/Sidebar"
import MapView from "./components/map/MapView"
import AuthPage from "./components/login/AuthPage"
import { getMe } from "./auth/me"
import type { User } from "./data/user"
import type { Category } from "./data/category"
import type { PinColorKey } from "./data/pinColors"
import type { BackendPlace } from "./data/backendPlace"
import api from "./api/api"
import TopUserBar from "./components/mobile/TopUserBar"
import BottomSheet from "./components/mobile/BottomSheet"
import CategoryEditModal from "./components/mobile/CategoryEditModal"

type SidebarMode =
  | { type: "default" }
  | { type: "edit-category"; category: string }

type LatLng = { lat: number; lng: number }
type FiltersMap = Record<string, boolean>

type RouteResponse = {
  paths: {
    distance: number
    time: number
    paths: [number, number][]
    points: BackendPlace[]
  }[]
}

type GraphHopperPath = [number, number][]

const METERS_PER_RADIUS_UNIT = 1720

const INITIAL_FILTERS = Object.fromEntries(
  CATEGORIES.map(c => [c.id, false])
) as FiltersMap

function App() {
  const [radius, setRadius] = useState(10)
  const [filters, setFilters] = useState<FiltersMap>(INITIAL_FILTERS)
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>({
    type: "default",
  })
  const [routePlaces, setRoutePlaces] = useState<BackendPlace[]>([])
  const [places, setPlaces] = useState<BackendPlace[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [categories, setCategories] = useState<Category[]>(CATEGORIES)
  const [routePath, setRoutePath] = useState<GraphHopperPath | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  const fetchedCategoriesRef = useRef<Set<string>>(new Set())

  // ---------------- AUTH (/auth/me) ----------------
  // useEffect(() => {
  //   getMe()
  //     .then(setUser)
  //     .catch(() => setUser(null))
  //     .finally(() => setAuthChecked(true))
  // }, [])
    // ---------------- end AUTH (/auth/me) ----------------

// ---------------- mockup user ----------------
// ---------------- mockup user ----------------
const DEV_USER: User = {
  id: 1,
  email: "dev@test.pl",
  username: "DevUser",
  routes: [],
}

useEffect(() => {
  setUser(DEV_USER)
  setAuthChecked(true)
}, [])
// ---------------- mockup user ----------------
// ---------------- mockup user ----------------


  // ---------------- GEOLOCATION ----------------
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () =>
        setUserLocation({
          lat: 54.37167,
          lng: 18.61236,
        })
    )
  }, [])

  // ---------------- CATEGORIES ----------------
  const updateCategoryColor = (id: string, color: PinColorKey) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, pinColor: color } : c))
    )
  }

  const toggleCategory = (id: string) => {
    setFilters(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // ---------------- FETCH POINTS ----------------
  useEffect(() => {
    if (!userLocation) return

    Object.entries(filters).forEach(([category, enabled]) => {
      if (enabled && !fetchedCategoriesRef.current.has(category)) {
        fetchedCategoriesRef.current.add(category)
        fetchCategory(category)
      }

      if (!enabled && fetchedCategoriesRef.current.has(category)) {
        fetchedCategoriesRef.current.delete(category)
        removeCategoryPlaces(category)
      }
    })
  }, [filters, userLocation])

  const fetchCategory = async (category: string) => {
    if (!userLocation) return

    const params = {
      categories: category,
      latitude: userLocation.lat,
      longitude: userLocation.lng,
      radius: radius * METERS_PER_RADIUS_UNIT,
    }

    try {
      const res = await api.get<BackendPlace[]>("/P`oints", { params })
      setPlaces(prev => [
        ...prev.filter(p => p.category !== category),
        ...res.data,
      ])
    } catch (err) {
      console.error("Błąd pobierania punktów:", err)
    }
  }

  const removeCategoryPlaces = (category: string) => {
    setPlaces(prev => prev.filter(p => p.category !== category))
  }

  // ---------------- ROUTE ----------------
  const handleSearchRoute = async () => {
    if (!userLocation) return

    setFilters(INITIAL_FILTERS)
    setPlaces([])
    fetchedCategoriesRef.current.clear()
    setSidebarMode({ type: "default" })

    const params = new URLSearchParams()

    Object.entries(filters)
      .filter(([, v]) => v)
      .forEach(([id]) => params.append("categories", id))

    params.append("latitude", userLocation.lat.toString())
    params.append("longitude", userLocation.lng.toString())
    params.append(
      "radius",
      (radius * METERS_PER_RADIUS_UNIT).toString()
    )

  const res = await api.get<RouteResponse>("/Routes", { params })
  const mainPath = res.data.paths[0]

    if (mainPath) {
      setRoutePath(mainPath.paths)
      setRoutePlaces(mainPath.points)
    } else {
      setRoutePath(null)
      setRoutePlaces([])
    }
  }

  // ---------------- RENDER ----------------
  if (!authChecked) return null

  if (!user) {
    return <AuthPage onLoginSuccess={setUser} />
  }

  return (
  <div className="h-screen w-screen relative overflow-hidden">
    {/* DESKTOP */}
    <div className="hidden md:flex h-full w-full">
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
        categories={categories}
        userLocation={userLocation}
        places={[...places, ...routePlaces]}
        routePath={routePath}
      />
    </div>

    {/* MOBILE */}
    <div className="md:hidden h-full w-full relative">
      <MapView
        radius={radius}
        categories={categories}
        userLocation={userLocation}
        places={[...places, ...routePlaces]}
        routePath={routePath}
        disabled={sidebarMode.type === "edit-category"}
      />

      <TopUserBar
        user={user}
        onLogout={() => setUser(null)}
      />

      <BottomSheet
        radius={radius}
        filters={filters}
        onRadiusChange={setRadius}
        onToggleCategory={toggleCategory}
        onEditCategory={(id) =>
          setSidebarMode({ type: "edit-category", category: id })
        }
        onSearchRoute={handleSearchRoute}
      />
      {sidebarMode.type === "edit-category" && (
        <CategoryEditModal
          category={
            categories.find(c => c.id === sidebarMode.category)!
          }
          onSave={updateCategoryColor}
          onClose={() => setSidebarMode({ type: "default" })}
        />
      )}
    </div>
  </div>
)
}

export default App
