import { MapContainer, TileLayer } from "react-leaflet"
import UserLocation from "../map/UserLocation"
import RadiusCircle from "../map/RadiusCircle"
import PlaceMarkers from "../map/PlaceMarkers"
import type { Category } from "../../data/category"

type LatLng = { lat: number; lng: number }

const DEFAULT_CENTER: [number, number] = [52.2297, 21.0122]

export default function MapView({
  radius,
  filters,
  categories,
  userLocation,
}: {
  radius: number
  filters: Record<string, boolean>
  categories: Category[]
  userLocation: LatLng | null
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
        <PlaceMarkers filters={filters} categories={categories} />
      </MapContainer>
    </main>
  )
}
