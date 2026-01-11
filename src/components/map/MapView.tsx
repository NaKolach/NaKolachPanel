import { MapContainer, TileLayer } from "react-leaflet"
import UserLocation from "../map/UserLocation"
import RadiusCircle from "../map/RadiusCircle"
import PlaceMarkers from "../map/PlaceMarkers"
import type { Category } from "../../data/category"
import type { BackendPlace } from "../../data/backendPlace"
import RoutePolyline from "../map/RoutePolyline"

type LatLng = { lat: number; lng: number }

const DEFAULT_CENTER: [number, number] = [54.37167, 18.61236]

export default function MapView({
  radius,
  categories,
  userLocation,
  places,
  routePath,
}: {
  radius: number
  filters: Record<string, boolean>
  categories: Category[]
  userLocation: LatLng | null
  places: BackendPlace[]
  routePath: any | null
}) {
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : DEFAULT_CENTER

  return (
    <main className="flex-1 h-full">
      <MapContainer center={center} zoom={12} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UserLocation center={center} />
        <RadiusCircle center={center} radius={radius} />
        <PlaceMarkers
          places={places}
          categories={categories}
        />      
        <RoutePolyline path={routePath} />
        </MapContainer>
    </main>
  )
}
