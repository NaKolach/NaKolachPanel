// import { Marker, Popup } from "react-leaflet"
// import L from "leaflet"

// const userPingSVG = L.divIcon({

// });
// function UserLocation({ center }: any) {
//   return <Marker position={center}>
//     <Popup></Popup>
//   </Marker>
// }
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import pinSVG from "../../assets/svg/pin4.svg"

const locationIcon = new L.Icon({
  iconUrl: pinSVG,
  iconSize: [28, 28],
})

export default function UserLocation({ center }: any) {
  return (
    <Marker position={center} icon={locationIcon}>
      <Popup>**Twoja pozycja**</Popup>
    </Marker>
  );
}