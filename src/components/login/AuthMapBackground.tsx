import { MapContainer, TileLayer } from "react-leaflet"

const WARSAW: [number, number] = [52.2297, 21.0122]

const AuthMapBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={WARSAW}
        zoom={12}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      {/* overlay blur + przygaszenie */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/40" />
    </div>
  )
}

export default AuthMapBackground
