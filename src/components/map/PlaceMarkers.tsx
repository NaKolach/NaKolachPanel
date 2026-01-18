import { Marker, Popup } from "react-leaflet"
import L from "leaflet"
import type { Category } from "../../data/category"
import { PIN_COLORS } from "../../data/pinColors"
import type { BackendPlace } from "../../data/backendPlace"

const makeIcon = (cat: Category, selected: boolean) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        position: relative;
        width: 48px;
        height: 48px;
      ">
        ${
          selected
            ? `
              <div style="
                position:absolute;
                inset:1px;
                border-radius:50%;
                box-shadow: 0 0 0 6px rgba(5, 0, 0, 0.35);
                z-index:0;
              "></div>
            `
            : ""
        }

        <!-- PIN -->
        <svg
          width="43"
          height="43"
          viewBox="0 0 24 24"
          style="
            position:absolute;
            top:0;
            left:0;
            z-index:1;
            display:block;
          "
        >
          <path
            fill="${PIN_COLORS[cat.pinColor].hex}"
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          />
        </svg>

        <!-- IKONA KATEGORII -->
        <img
          src="${cat.iconUrl}"
          alt=""
          style="
            position:absolute;
            top:9px;
            left:12px;
            width:19px;
            height:19px;
            display:block;
            object-fit:contain;
            z-index:2;
            filter:brightness(0) invert(1);
            pointer-events:none;
          "
        />
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

type PlaceMarkersProps = {
  places: BackendPlace[]
  categories: Category[]
  selectedPlaces?: Set<BackendPlace>
  onTogglePlace?: (place: BackendPlace) => void
  readonly?: boolean
}

export default function PlaceMarkers({
  places,
  categories,
  selectedPlaces,
  onTogglePlace,
  readonly = false,
}: PlaceMarkersProps) {
  return (
    <>
      {places.map(place => {
        const { latitude, longitude, category, id } = place
        if (latitude == null || longitude == null) return null

        const cat = categories.find(c => c.id === category)
        if (!cat) return null

        const isSelected =
          !readonly &&
          selectedPlaces &&
          Array.from(selectedPlaces).some(p => p.id === id)

        return (
          <Marker
            key={`${category}-${id}`}
            position={[latitude, longitude]}
            icon={makeIcon(cat, !!isSelected)}
          >
            <Popup>
              <div className="text-sm space-y-1">
                <div><strong>Kategoria:</strong> {cat.label}</div>
                <div><strong>Nazwa:</strong> {place.name ?? "Brak nazwy"}</div>
                <div><strong>Lat:</strong> {latitude.toFixed(6)}</div>
                <div><strong>Lng:</strong> {longitude.toFixed(6)}</div>

                {!readonly && onTogglePlace && selectedPlaces && (
                  <button
                    onClick={() => onTogglePlace(place)}
                    className={`
                      mt-2 w-full text-xs py-1 rounded border
                      ${
                        isSelected
                          ? "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                          : "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                      }
                    `}
                  >
                    {isSelected ? "Usuń z listy" : "Dodaj do listy"}
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}
