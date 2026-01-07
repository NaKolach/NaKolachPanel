import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { Category } from '../../data/category'
import { PIN_COLORS } from '../../data/pinColors'
import type { BackendPlace } from "../../data/backendPlace"

const makeIcon = (cat: Category) =>
  L.divIcon({
    className: '',
    html: `
      <svg width="43" height="43" viewBox="0 0 24 24">
        <path
          fill="${PIN_COLORS[cat.pinColor].hex}"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        />
      </svg>
      <img
        src="${cat.iconUrl}"
        style="
          position:absolute;
          top:9px;left:12px;
          width:19px;height:19px;
          filter:brightness(0) invert(1);
        "
      />
    `,
    iconSize: [48, 48],
    iconAnchor: [16, 32],
  })

export default function PlaceMarkers({
  places,
  categories,
}: {
  places: BackendPlace[]
  categories: Category[]
}) {
  return (
    <>
      {places.map(place => {
        const { latitude, longitude, category } = place
        if (latitude == null || longitude == null) return null

        const cat = categories.find(c => c.id === category)
        if (!cat) return null

        return (
          <Marker
            key={`${category}-${place.id}`}
            position={[latitude, longitude]}
            icon={makeIcon(cat)}
          >
            <Popup>
              <div className="text-sm space-y-1">
                <div><strong>Kategoria:</strong> {cat.label}</div>
                <div><strong>Nazwa:</strong> {place.name ?? "Brak nazwy"}</div>
                <div><strong>Lat:</strong> {latitude.toFixed(6)}</div>
                <div><strong>Lng:</strong> {longitude.toFixed(6)}</div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}
