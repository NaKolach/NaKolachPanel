// UI (React)
//import AirportIcon from '../assets/svg/airport.svg?react'
import BarIcon from '../assets/svg/bar.svg?react'
import CafeIcon from '../assets/svg/cafe.svg?react'
import CampingIcon from '../assets/svg/camping.svg?react'
//import HotelIcon from '../assets/svg/hotel.svg?react'
import MuseumIcon from '../assets/svg/museum.svg?react'
import ParkIcon from '../assets/svg/park.svg?react'
import RestaurantIcon from '../assets/svg/restaurant.svg?react'
import ShopIcon from '../assets/svg/grocery.svg?react'
import StationIcon from '../assets/svg/station.svg?react'
import TheaterIcon from '../assets/svg/theater.svg?react'
import ZooIcon from '../assets/svg/zoo.svg?react'

// MAPA (URL do tego SAMEGO pliku)
//import airportUrl from '../assets/svg/airport.svg'
import barUrl from '../assets/svg/bar.svg'
import cafeUrl from '../assets/svg/cafe.svg'
import campingUrl from '../assets/svg/camping.svg'
//import hotelUrl from '../assets/svg/hotel.svg'
import museumUrl from '../assets/svg/museum.svg'
import parkUrl from '../assets/svg/park.svg'
import restaurantUrl from '../assets/svg/restaurant.svg'
import shopUrl from '../assets/svg/grocery.svg'
import stationUrl from '../assets/svg/station.svg'
import theaterUrl from '../assets/svg/theater.svg'
import zooUrl from '../assets/svg/zoo.svg'

export const CATEGORIES = [
  //{ id: 'airport', label: 'Lotniska', Icon: AirportIcon, iconUrl: airportUrl },
  { id: 'bar', label: 'Bary', Icon: BarIcon, iconUrl: barUrl },
  { id: 'cafe', label: 'Kawiarnie', Icon: CafeIcon, iconUrl: cafeUrl },
  { id: 'camping', label: 'Campingi', Icon: CampingIcon, iconUrl: campingUrl },
  //{ id: 'hotel', label: 'Hotele', Icon: HotelIcon, iconUrl: hotelUrl },
  { id: 'museum', label: 'Muzea', Icon: MuseumIcon, iconUrl: museumUrl },
  { id: 'park', label: 'Parki', Icon: ParkIcon, iconUrl: parkUrl },
  { id: 'restaurant', label: 'Restauracje', Icon: RestaurantIcon, iconUrl: restaurantUrl },
  { id: 'shop', label: 'Sklepy', Icon: ShopIcon, iconUrl: shopUrl },
  { id: 'station', label: 'Stacje', Icon: StationIcon, iconUrl: stationUrl },
  { id: 'theater', label: 'Teatry', Icon: TheaterIcon, iconUrl: theaterUrl },
  { id: 'zoo', label: 'Zoo', Icon: ZooIcon, iconUrl: zooUrl },
] as const
