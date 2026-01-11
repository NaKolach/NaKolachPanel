import { Polyline } from "react-leaflet"

// Zmieniony typ, aby pasował do surowej tablicy koordynatów [lat, lng]
type GraphHopperPath = [number, number][];

interface RoutePolylineProps {
  path: GraphHopperPath | null;
}

export default function RoutePolyline({ path }: RoutePolylineProps) {
  // Jeśli path nie istnieje lub jest pustą tablicą, nic nie renderuj
  if (!path || path.length === 0) return null;

  // W Twoim JSONIE współrzędne są już w formacie [lat, lng], 
  // więc przekazujemy je bezpośrednio do Polyline.
  return (
    <Polyline
      positions={path}
      pathOptions={{
        color: "#2563eb",
        weight: 5,
        opacity: 0.8,
        lineJoin: 'round'
      }}
    />
  )
}