import { useEffect, useRef, useState } from "react"
import { CATEGORIES } from "./data/categories"
import Sidebar from "./components/layout/Sidebar"
import MapView from "./components/layout/MapView"
import AuthPage from "./components/login/AuthPage"
import { getMe } from "./auth/me"
import type { User } from "./data/user"
import type { Category } from "./data/category"
import type { PinColorKey } from "./data/pinColors"
import type { BackendPlace } from "./data/backendPlace"
import api from "./api/api"
import TopUserBar from "./components/layout/mobile/TopUserBar"
import BottomSheet from "./components/layout/mobile/BottomSheet"
import CategoryEditModal from "./components/layout/mobile/CategoryEditModal"
import MapResetController from "./components/map/MapResetController"
import { authDead, resetAuthDead } from "./auth/authState"

type SidebarMode =
  | { type: "default" }
  | { type: "edit-category"; category: string }
  | { type: "saved-routes" }

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

export default function App() {
  const [radius, setRadius] = useState(10)
  const [debouncedRadius, setDebouncedRadius] = useState(10)

  const [filters, setFilters] = useState<FiltersMap>(INITIAL_FILTERS)
  const [places, setPlaces] = useState<BackendPlace[]>([])
  const [routePlaces, setRoutePlaces] = useState<BackendPlace[]>([])
  const [routePath, setRoutePath] = useState<GraphHopperPath | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [categories, setCategories] = useState<Category[]>(CATEGORIES)

  const [sidebarMode, setSidebarMode] = useState<SidebarMode>({ type: "default" })
  const [isSearchingRoute, setIsSearchingRoute] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [mobileMode, setMobileMode] = useState<"default" | "saved-routes">("default")

  const pointsAbortRef = useRef<Map<string, AbortController>>(new Map())

  // ---------- AUTH BOOTSTRAP ----------
  useEffect(() => {
    let mounted = true

    if (authDead) {
      if (mounted) {
        setUser(null)
        setAuthChecked(true)
      }
      return
    }

    getMe()
      .then(u => mounted && setUser(u))
      .catch(() => mounted && setUser(null))
      .finally(() => mounted && setAuthChecked(true))

    return () => {
      mounted = false
    }
  }, [])

  // ---------- GEOLOCATION ----------
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

  // ---------- DEBOUNCE RADIUS ----------
  useEffect(() => {
    const id = setTimeout(() => setDebouncedRadius(radius), 1000)
    return () => clearTimeout(id)
  }, [radius])

  // ---------- RESET ROUTE ----------
  useEffect(() => {
    setRoutePath(null)
    setRoutePlaces([])
  }, [filters, debouncedRadius])

  // ---------- CATEGORY COLOR ----------
  const updateCategoryColor = (id: string, color: PinColorKey) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, pinColor: color } : c))
    )
  }

  // ---------- TOGGLE CATEGORY ----------
  const toggleCategory = (id: string) => {
    setFilters(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // ---------- FETCH POINTS ----------
  useEffect(() => {
    if (!userLocation || !user) return

    Object.entries(filters).forEach(([category, enabled]) => {
      if (!enabled) {
        pointsAbortRef.current.get(category)?.abort()
        pointsAbortRef.current.delete(category)
        setPlaces(p => p.filter(pl => pl.category !== category))
        return
      }

      pointsAbortRef.current.get(category)?.abort()

      const controller = new AbortController()
      pointsAbortRef.current.set(category, controller)

      api
        .get<BackendPlace[]>("/Points", {
          params: {
            categories: category,
            latitude: userLocation.lat,
            longitude: userLocation.lng,
            radius: debouncedRadius * METERS_PER_RADIUS_UNIT,
          },
          signal: controller.signal,
        })
        .then(res => {
          setPlaces(prev => [
            ...prev.filter(p => p.category !== category),
            ...res.data,
          ])
        })
        .catch(err => {
          if (err.name !== "CanceledError") throw err
        })
    })
  }, [filters, debouncedRadius, userLocation, user])

  // ---------- ROUTE ----------
  const handleSearchRoute = async () => {
    if (!Object.values(filters).some(Boolean)) return
    if (!userLocation) return

    pointsAbortRef.current.forEach(c => c.abort())
    pointsAbortRef.current.clear()

    setFilters(INITIAL_FILTERS)
    setPlaces([])
    setRoutePath(null)
    setRoutePlaces([])
    setIsSearchingRoute(true)

    try {
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
      }
    } finally {
      setIsSearchingRoute(false)
    }
  }
  const handleSelectRecentRoute = (routeId: number) => {
    pointsAbortRef.current.forEach(c => c.abort())
    pointsAbortRef.current.clear()

    setFilters(INITIAL_FILTERS)
    setPlaces([])

    // TODO: backend
    // GET /api/routes/{routeId}
  }


  // ---------- LOGIN ----------
  const handleLoginSuccess = (u: User) => {
    resetAuthDead()
    setUser(u)
  }

  // ---------- LOGOUT ----------
  const handleLogout = async () => {
    pointsAbortRef.current.forEach(c => c.abort())
    pointsAbortRef.current.clear()

    try {
      await api.post("/auth/logout")
    } catch {}

    setUser(null)
    setPlaces([])
    setRoutePlaces([])
    setRoutePath(null)
    setFilters(INITIAL_FILTERS)
    setSidebarMode({ type: "default" })
  }

  // ---------- RENDER ----------
  if (!authChecked) return null
  if (!user) return <AuthPage onLoginSuccess={handleLoginSuccess} />

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="hidden md:flex h-full">
        <Sidebar
          user={user}
          onLogout={handleLogout}
          radius={radius}
          filters={filters}
          onRadiusChange={setRadius}
          onToggleCategory={toggleCategory}
          sidebarMode={sidebarMode}
          setSidebarMode={setSidebarMode}
          onSelectRecentRoute={handleSelectRecentRoute}
          categories={categories}
          onSaveCategoryColor={updateCategoryColor}
          onSearchRoute={handleSearchRoute}
          isSearchingRoute={isSearchingRoute}
          routePath={routePath}
          routePlaces={routePlaces}
        />

        <MapResetController
          resetKey={`${userLocation?.lat}-${userLocation?.lng}`}
          onReset={() => {
            pointsAbortRef.current.forEach(c => c.abort())
            pointsAbortRef.current.clear()
            setPlaces([])
            setRoutePlaces([])
            setRoutePath(null)
          }}
        />

        <MapView
          radius={radius}
          categories={categories}
          userLocation={userLocation}
          places={places}
          routePlaces={routePlaces}
          routePath={routePath}
        />
      </div>

      <div className="md:hidden h-full">
        <MapView
          radius={radius}
          categories={categories}
          userLocation={userLocation}
          places={places}
          routePlaces={routePlaces}
          routePath={routePath}
          disabled={sidebarMode.type === "edit-category"}
        />

        <TopUserBar
          user={user}
          onLogout={handleLogout}
          onShowSavedRoutes={() => setMobileMode("saved-routes")}
        />

        <BottomSheet
          radius={radius}
          filters={filters}
          onRadiusChange={setRadius}
          onToggleCategory={toggleCategory}
          onEditCategory={id =>
            setSidebarMode({ type: "edit-category", category: id })
          }
          onSearchRoute={handleSearchRoute}
          isSearchingRoute={isSearchingRoute}
          onSelectRecentRoute={handleSelectRecentRoute}
          mode={mobileMode}
          onBack={() => setMobileMode("default")}
        />

        {sidebarMode.type === "edit-category" && (
          <CategoryEditModal
            category={categories.find(c => c.id === sidebarMode.category)!}
            onSave={updateCategoryColor}
            onClose={() => setSidebarMode({ type: "default" })}
          />
        )}
      </div>
    </div>
  )
}
