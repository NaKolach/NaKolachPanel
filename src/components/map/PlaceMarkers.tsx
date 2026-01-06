import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { Category } from '../../data/category'
import { PIN_COLORS } from '../../data/pinColors'
import type { BackendPlace } from "../../data/backendPlace"

type Props = {
  places: BackendPlace[]
  categories: Category[]
}

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
  filters,
  categories,
}: {
  places: BackendPlace[]
  filters: Record<string, boolean>
  categories: Category[]
}) {
  return (
    <>
      {places.map(place => {
        const lat = place.center?.lat ?? place.latitude ?? place.lat
        const lon = place.center?.lon ?? place.longitude ?? place.lon
        if (lat == null || lon == null) return null

        // mapowanie OSM → Twoja kategoria
        const osmCategory =
          place.tags.leisure === 'park'
            ? 'park'
            : place.tags.amenity ??
              place.tags.tourism ??
              place.tags.shop ??
              null

        if (!osmCategory) return null

        const cat = categories.find(c => c.id === osmCategory)
        if (!cat) return null

        return (
          <Marker
            key={`${osmCategory}-${place.id}`}
            position={[lat, lon]}
            icon={makeIcon(cat)}
          >
            <Popup>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Kategoria:</strong>{" "}
                  {cat?.label ?? place.categoryId}
                </div>

                <div>
                  <strong>Nazwa:</strong>{" "}
                  {place.tags?.name ?? "Brak nazwy"}
                </div>

                <div>
                  <strong>Lat:</strong> {lat.toFixed(6)}
                </div>

                <div>
                  <strong>Lng:</strong> {lon.toFixed(6)}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}
