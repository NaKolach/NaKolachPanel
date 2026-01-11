import { Polyline } from "react-leaflet"

type GraphHopperPath = {
  points: {
    type: "LineString"
    coordinates: [number, number][]
  }
}

export default function RoutePolyline({
  path,
}: {
  path: GraphHopperPath | null
}) {
  if (!path) return null

  const latLngs: [number, number][] = path.points.coordinates.map(
    ([lng, lat]) => [lat, lng]
  )

  return (
    <Polyline
      positions={latLngs}
      pathOptions={{
        color: "#2563eb",
        weight: 4,
        opacity: 0.9,
      }}
    />
  )
}
