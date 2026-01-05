import { Marker } from 'react-leaflet'
import L from 'leaflet'
import type { Category } from '../../data/category'
import { PIN_COLORS } from '../../data/pinColors'

type Place = {
  id: string
  category: string
  position: [number, number]
}

const BASE_POSITION: [number, number] = [52.24, 21.01]

const makePlaces = (categories: Category[]): Place[] =>
  categories.map((cat, index) => ({
    id: cat.id,
    category: cat.id,
    position: [
      BASE_POSITION[0] + index * 0.005,
      BASE_POSITION[1] + index * 0.007,
    ],
  }))

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
  filters,
  categories,
}: {
  filters: Record<string, boolean>
  categories: Category[]
}) {
  const places = makePlaces(categories)

  return (
    <>
      {places
        .filter(p => filters[p.category])
        .map(place => {
          const cat = categories.find(c => c.id === place.category)!

          return (
            <Marker
              key={`${cat.id}-${cat.pinColor}`}
              position={place.position}
              icon={makeIcon(cat)}
            />
          )
        })}
    </>
  )
}


// import { Marker } from 'react-leaflet'
// import L from 'leaflet'
// import { CATEGORIES } from '../../data/categories'
// import { PIN_COLORS } from '../../data/pinColors'

// const ICONS: Record<string, L.DivIcon> = Object.fromEntries(
//   CATEGORIES.map(cat => {
//     const color = PIN_COLORS[cat.pinColor].hex

//     return [
//       cat.id,
//       L.divIcon({
//         className: '',
//         html: `
//           <svg width="43" height="43" viewBox="0 0 24 24">
//             <path
//               fill="${color}"
//               d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
//             />
//           </svg>
//           <img
//             src="${cat.iconUrl}"
//             style="
//               position:absolute;
//               top:9px;left:12px;
//               width:19px;height:19px;
//               filter:brightness(0) invert(1);
//             "
//           />
//         `,
//         iconSize: [48, 48],
//         iconAnchor: [16, 32],
//       }),
//     ]
//   })
// )


// const BASE_POSITION: [number, number] = [52.24, 21.01]

// const PLACEHOLDER_PLACES = CATEGORIES.map((cat, index) => ({
//   id: cat.id,
//   category: cat.id,
//   position: [
//     BASE_POSITION[0] + index * 0.005,
//     BASE_POSITION[1] + index * 0.007,
//   ] as [number, number],
// }))

// type Props = {
//   filters: Record<string, boolean>
// }

// export default function PlaceMarkers({ filters }: Props) {
//   return (
//     <>
//       {PLACEHOLDER_PLACES
//         .filter(place => filters[place.category])
//         .map(place => (
//           <Marker
//             key={place.id}
//             position={place.position}
//             icon={ICONS[place.category]}
//           />
//         ))}
//     </>
//   )
// }
