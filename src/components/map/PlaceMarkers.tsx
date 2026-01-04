import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { CATEGORIES } from '../../data/categories'

const PIN_COLORS: Record<string, string> = {
  airport: '#2563eb',
  bar: '#7c2d12',
  cafe: '#92400e',
  camping: '#166534',
  hotel: '#7c3aed',
  museum: '#1e3a8a',
  park: '#15803d',
  restaurant: '#b91c1c',
  shop: '#0f766e',
  station: '#374151',
  theater: '#6b21a8',
  zoo: '#365314',
}

const ICONS: Record<string, L.DivIcon> = Object.fromEntries(
  CATEGORIES.map(cat => {
    const color = PIN_COLORS[cat.id] ?? '#16a34a'

    return [
      cat.id,
      L.divIcon({
        className: '',
        html: `
          <div style="
            position: relative;
            width: 43px;
            height: 43px;
          ">
            <svg
              width="43"
              height="43"
              viewBox="0 0 24 24"
              style="display: block;"
            >
              <path
                fill="${color}"
                d="M12 2
                  C8.13 2 5 5.13 5 9
                  c0 5.25 7 13 7 13
                  s7-7.75 7-13
                  c0-3.87-3.13-7-7-7
                  z"
              />
            </svg>

            <img
              src="${cat.iconUrl}"
              style="
                position: absolute;
                top: 9px;
                left: 12px;
                width: 19px;
                height: 19px;
                pointer-events: none;
                filter: brightness(0) invert(1);
              "
            />
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [16, 32],
      }),
    ]
  })
)

const BASE_POSITION: [number, number] = [52.24, 21.01]

const PLACEHOLDER_PLACES = CATEGORIES.map((cat, index) => ({
  id: cat.id,
  category: cat.id,
  position: [
    BASE_POSITION[0] + index * 0.005,
    BASE_POSITION[1] + index * 0.007,
  ] as [number, number],
}))

type Props = {
  filters: Record<string, boolean>
}

export default function PlaceMarkers({ filters }: Props) {
  return (
    <>
      {PLACEHOLDER_PLACES
        .filter(place => filters[place.category])
        .map(place => (
          <Marker
            key={place.id}
            position={place.position}
            icon={ICONS[place.category]}
          />
        ))}
    </>
  )
}
