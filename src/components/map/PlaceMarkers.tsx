import { Marker } from "react-leaflet"
import L from "leaflet"
import kawiarniaSvg from "../../assets/svg/kawiarnia.svg"
import museumSvg from "../../assets/svg/museum.svg"

const cafeIcon = new L.Icon({
  iconUrl: kawiarniaSvg,
  iconSize: [28, 28],
})

const museumIcon = new L.Icon({
  iconUrl: museumSvg,
  iconSize: [28, 28],
})

export default function PlaceMarkers({ filters }: any) {
  return (
    <>
      {filters.cafes && (
        <Marker position={[52.235, 21.01]} icon={cafeIcon} />
      )}
      {filters.museums && (
        <Marker position={[52.225, 21.02]} icon={museumIcon} />
      )}
    </>
  )
}
