import type { Category } from './category' // albo gdzie masz typ

// UI (React)
import BarIcon from '../assets/svg/bar.svg?react'
import CafeIcon from '../assets/svg/cafe.svg?react'
import CampingIcon from '../assets/svg/camping.svg?react'
import MuseumIcon from '../assets/svg/museum.svg?react'
import ParkIcon from '../assets/svg/park.svg?react'
import RestaurantIcon from '../assets/svg/restaurant.svg?react'
import ShopIcon from '../assets/svg/grocery.svg?react'
import StationIcon from '../assets/svg/station.svg?react'
import TheaterIcon from '../assets/svg/theater.svg?react'
import ZooIcon from '../assets/svg/zoo.svg?react'

// MAPA (URL do TEGO SAMEGO pliku)
import barUrl from '../assets/svg/bar.svg'
import cafeUrl from '../assets/svg/cafe.svg'
import campingUrl from '../assets/svg/camping.svg'
import museumUrl from '../assets/svg/museum.svg'
import parkUrl from '../assets/svg/park.svg'
import restaurantUrl from '../assets/svg/restaurant.svg'
import shopUrl from '../assets/svg/grocery.svg'
import stationUrl from '../assets/svg/station.svg'
import theaterUrl from '../assets/svg/theater.svg'
import zooUrl from '../assets/svg/zoo.svg'

export const CATEGORIES: Category[] = [
  {
    id: 'bar',
    label: 'Bary',
    Icon: BarIcon,
    iconUrl: barUrl,
    pinColor: 'red',
  },
  {
    id: 'cafe',
    label: 'Kawiarnie',
    Icon: CafeIcon,
    iconUrl: cafeUrl,
    pinColor: 'orange',
  },
  {
    id: 'camping',
    label: 'Campingi',
    Icon: CampingIcon,
    iconUrl: campingUrl,
    pinColor: 'yellow',
  },
  {
    id: 'museum',
    label: 'Muzea',
    Icon: MuseumIcon,
    iconUrl: museumUrl,
    pinColor: 'green',
  },
  {
    id: 'park',
    label: 'Parki',
    Icon: ParkIcon,
    iconUrl: parkUrl,
    pinColor: 'teal',
  },
  {
    id: 'restaurant',
    label: 'Restauracje',
    Icon: RestaurantIcon,
    iconUrl: restaurantUrl,
    pinColor: 'sky',
  },
  {
    id: 'shop',
    label: 'Sklepy',
    Icon: ShopIcon,
    iconUrl: shopUrl,
    pinColor: 'indigo',
  },
  {
    id: 'station',
    label: 'Stacje',
    Icon: StationIcon,
    iconUrl: stationUrl,
    pinColor: 'purple',
  },
  {
    id: 'theater',
    label: 'Teatry',
    Icon: TheaterIcon,
    iconUrl: theaterUrl,
    pinColor: 'fuchsia',
  },
  {
    id: 'zoo',
    label: 'Zoo',
    Icon: ZooIcon,
    iconUrl: zooUrl,
    pinColor: 'rose',
  },
]
