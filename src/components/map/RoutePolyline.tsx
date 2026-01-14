import { Polyline } from "react-leaflet"

type GraphHopperPath = [number, number][];

interface RoutePolylineProps {
  path: GraphHopperPath | null;
}

export default function RoutePolyline({ path }: RoutePolylineProps) {
  if (!path || path.length === 0) return null;

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