import { MapContainer, TileLayer } from "react-leaflet";
import UserLocation from "../map/UserLocation";
import RadiusCircle from "../map/RadiusCircle";
import PlaceMarkers from "../map/PlaceMarkers";
import RoutePolyline from "../map/RoutePolyline";
import type { Category } from "../../data/category";
import type { BackendPlace } from "../../data/backendPlace";

type LatLng = { lat: number; lng: number };

const DEFAULT_CENTER: [number, number] = [54.37167, 18.61236];

interface MapViewProps {
  radius: number;
  categories: Category[];
  userLocation: LatLng | null;
  places: BackendPlace[];
  routePlaces: BackendPlace[][];
  // Teraz to tablica tras (tablica tablic współrzędnych)
  routePath: [number, number][][];
  // Indeks aktualnie wybranej trasy
  selectedRouteIndex: number;
  selectedPlaces: Set<BackendPlace>;
  onTogglePlace: (place: BackendPlace) => void;
  disabled?: boolean;
}

export default function MapView({
  radius,
  categories,
  userLocation,
  places,
  routePlaces,
  routePath,
  selectedRouteIndex,
  selectedPlaces,
  onTogglePlace,
  disabled = false,
}: MapViewProps) {
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : DEFAULT_CENTER;

  return (
    <main className={`h-full w-full ${disabled ? "pointer-events-none" : ""}`}>
      <MapContainer center={center} zoom={12} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <UserLocation center={center} />
        <RadiusCircle center={center} radius={radius} />

        {/* INTERAKTYWNE PUNKTY */}
        <PlaceMarkers
          places={places}
          categories={categories}
          selectedPlaces={selectedPlaces}
          onTogglePlace={onTogglePlace}
        />

        {/* PUNKTY WYBRANEJ TRASY — READONLY */}
        {routePlaces && routePlaces[selectedRouteIndex] && (
          <PlaceMarkers
            places={routePlaces[selectedRouteIndex]} // Wybieramy konkretną paczkę pinów
            categories={categories}
            readonly
          />
        )}

        {/* RYSOWANIE WYBRANEJ TRASY */}
        {routePath && routePath.length > 0 && routePath[selectedRouteIndex] && (
          <RoutePolyline path={routePath[selectedRouteIndex]} />
        )}
      </MapContainer>
    </main>
  );
}
