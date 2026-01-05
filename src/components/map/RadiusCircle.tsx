import { Circle } from "react-leaflet"

export default function RadiusCircle({ center, radius }: any) {
  return (
    <Circle
      center={center}
      radius={radius * 1000}
      pathOptions={{ color: "green", fillOpacity: 0.15 }}
    />
  )
}
