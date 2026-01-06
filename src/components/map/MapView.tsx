import { MapContainer, TileLayer } from "react-leaflet"
import UserLocation from "../map/UserLocation"
import RadiusCircle from "../map/RadiusCircle"
import PlaceMarkers from "../map/PlaceMarkers"
import type { Category } from "../../data/category"

type LatLng = { lat: number; lng: number }

const DEFAULT_CENTER: [number, number] = [54.3520, 18.6466]

type BackendPlace = {
  id: number
  lat?: number
  lon?: number
  latitude?: number
  longitude?: number
  tags: Record<string, string>
}

export default function MapView({
  radius,
  filters,
  categories,
  userLocation,
  places,
}: {
  radius: number
  filters: Record<string, boolean>
  categories: Category[]
  userLocation: LatLng | null
  places: BackendPlace[]
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
          filters={filters}
          categories={categories}
        />      
        </MapContainer>
    </main>
  )
}
