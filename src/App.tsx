import { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from './data/categories'
import Sidebar from './components/layout/Sidebar'
import MapView from './components/map/MapView'
import AuthPage from './components/login/AuthPage'
import type { User } from './data/user'
import type { Category } from './data/category'
import type { PinColorKey } from './data/pinColors'
import type { BackendPlace } from './data/backendPlace'

type SidebarMode =
  | { type: 'default' }
  | { type: 'edit-category'; category: string }

type LatLng = { lat: number; lng: number }
type FiltersMap = Record<string, boolean>

// type GraphHopperPath = {
//   points: {
//     type: 'LineString'
//     coordinates: [number, number][]
//   }
// }
type RouteResponse = {
  paths: {
    distance: number;
    time: number;
    // To są te surowe koordynaty [lat, lng]
    paths: [number, number][]; 
    // Twoje miejsca na trasie
    points: BackendPlace[]; 
  }[];
};

// Zaktualizuj też typ stanu, żeby przyjmował tablicę koordynatów
type GraphHopperPath = [number, number][];

const METERS_PER_RADIUS_UNIT = 1720

const INITIAL_FILTERS = Object.fromEntries(
  CATEGORIES.map(c => [c.id, false])
) as FiltersMap

function App() {
  const [radius, setRadius] = useState(10)
  const [filters, setFilters] = useState<FiltersMap>(INITIAL_FILTERS)
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>({ type: 'default' })
  const [routePlaces, setRoutePlaces] = useState<BackendPlace[]>([])
  const [places, setPlaces] = useState<BackendPlace[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [categories, setCategories] = useState<Category[]>(CATEGORIES)
  const [routePath, setRoutePath] = useState<GraphHopperPath | null>(null)

  const fetchedCategoriesRef = useRef<Set<string>>(new Set())

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

  // ---------------- AUTH ----------------
  const handleLogin = async (data: { email: string; password: string }) => {
    setUser({ email: data.email, username: 'DevUser', routes: [] })
  }

  const handleRegister = async (data: {
    email: string
    username: string
    password: string
  }) => {
    setUser({ email: data.email, username: data.username, routes: [] })
  }

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

  // ---------------- FETCH POINTS (EFFECT) ----------------
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

    const params = new URLSearchParams({
      categories: category,
      latitude: userLocation.lat.toString(),
      longitude: userLocation.lng.toString(),
      radius: (radius * METERS_PER_RADIUS_UNIT).toString(),
    })

    const res = await fetch(`http://nakolach.com/api/Points?${params}`)
    if (!res.ok) return

    const data: BackendPlace[] = await res.json()

    setPlaces(prev => [
      ...prev.filter(p => p.category !== category),
      ...data,
    ])
  }

  const removeCategoryPlaces = (category: string) => {
    setPlaces(prev => prev.filter(p => p.category !== category))
  }

  // ---------------- ROUTE ----------------
  // const handleSearchRoute = async () => {
  //   if (!userLocation) return

  //   setFilters(INITIAL_FILTERS)
  //   setPlaces([])
  //   fetchedCategoriesRef.current.clear()
  //   setSidebarMode({ type: 'default' })

  //   const params = new URLSearchParams()

  //   Object.entries(filters)
  //     .filter(([, v]) => v)
  //     .forEach(([id]) => params.append('types', id))

  //   params.append('latitude', userLocation.lat.toString())
  //   params.append('longitude', userLocation.lng.toString())
  //   params.append(
  //     'radius',
  //     (radius * METERS_PER_RADIUS_UNIT).toString()
  //   )

  //   const res = await fetch(
  //     `http://nakolach.com/api/Route?${params.toString()}`
  //   )
  //   if (!res.ok) return

  //   const json: RouteResponse = await res.json()
  //   const path = json.paths[0]

  //   setRoutePath(path?.points ?? null)
  //   setRoutePlaces(path?.places ?? [])
  // }
// ---------------- ROUTE ----------------
  const handleSearchRoute = async () => {
    if (!userLocation) return;

    // Resetowanie widoku i filtrów przed nowym wyszukiwaniem
    setFilters(INITIAL_FILTERS);
    setPlaces([]);
    fetchedCategoriesRef.current.clear();
    setSidebarMode({ type: 'default' });

    const params = new URLSearchParams();

    // Dodawanie wybranych kategorii do parametrów
    Object.entries(filters)
      .filter(([, v]) => v)
      .forEach(([id]) => params.append('categories', id));

    params.append('latitude', userLocation.lat.toString());
    params.append('longitude', userLocation.lng.toString());
    params.append(
      'radius',
      (radius * METERS_PER_RADIUS_UNIT).toString()
    );

    try {
      const res = await fetch(
        `http://nakolach.com/api/Routes?${params.toString()}`
      );

      if (!res.ok) {
        console.error("Błąd pobierania trasy:", res.statusText);
        return;
      }

      const json: RouteResponse = await res.json();
      
      // Według Twojego JSONa trasa jest w pierwszym elemencie tablicy paths
      const mainPath = json.paths[0];

      if (mainPath) {
        // Ustawiamy geometrię linii (tablica punktów [lat, lng])
        setRoutePath(mainPath.paths);
        // Ustawiamy ikony miejsc na trasie
        setRoutePlaces(mainPath.points);
      } else {
        setRoutePath(null);
        setRoutePlaces([]);
      }
    } catch (error) {
      console.error("Błąd połączenia z API:", error);
    }
  };
  // ---------------- RENDER ----------------
  if (!user) {
    return <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
  }

  return (
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
        places={[...places, ...routePlaces]}
        routePath={routePath}
      />
    </div>
  )
}

export default App
