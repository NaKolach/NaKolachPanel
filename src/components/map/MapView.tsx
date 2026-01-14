import { MapContainer, TileLayer } from "react-leaflet"
import UserLocation from "../map/UserLocation"
import RadiusCircle from "../map/RadiusCircle"
import PlaceMarkers from "../map/PlaceMarkers"
import RoutePolyline from "../map/RoutePolyline"
import type { Category } from "../../data/category"
import type { BackendPlace } from "../../data/backendPlace"

type LatLng = { lat: number; lng: number }

const DEFAULT_CENTER: [number, number] = [54.37167, 18.61236]

interface MapViewProps {
  radius: number
  categories: Category[]
  userLocation: LatLng | null
  places: BackendPlace[]
  routePath: any | null
  disabled?: boolean
}

export default function MapView({
  radius,
  categories,
  userLocation,
  places,
  routePath,
  disabled = false,
}: MapViewProps) {
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : DEFAULT_CENTER

  return (
    <main
      className={`h-full w-full ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UserLocation center={center} />
        <RadiusCircle center={center} radius={radius} />
        <PlaceMarkers places={places} categories={categories} />
        <RoutePolyline path={routePath} />
      </MapContainer>
    </main>
  )
}
