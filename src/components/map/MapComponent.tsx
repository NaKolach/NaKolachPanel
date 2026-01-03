// Inside MapComponent.tsx, replace the entire icon fix block with this:
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L, {type LatLngTuple } from 'leaflet';

// 1. IMPORT ASSETS USING STANDARD ES MODULE IMPORTS
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

// --- START: CRUCIAL FIX FOR DEFAULT LEAFLET ICONS ---
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  // 2. Use the imported variables here
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});
// --- END: CRUCIAL FIX FOR DEFAULT LEAFLET ICONS ---

// ... rest of your component code

// 3. Define Component Props Interface
interface MapComponentProps {
  initialCenter?: LatLngTuple; 
  initialZoom?: number;
}

// 4. Define the Functional Component
const MapComponent: React.FC<MapComponentProps> = ({ 
  initialCenter = [51.505, -0.09], // Default: London
  initialZoom = 13 
}) => {
  
  const markerPosition: LatLngTuple = [51.51, -0.1];

  return (
    // MapContainer creates the main map instance
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom={true}
      // CRITICAL: Must define the map dimensions
      style={{ height: '500px', width: '100%', borderRadius: '8px', zIndex: 0 }}
    >
      
      {/* TileLayer provides the visual map data (OpenStreetMap) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Add a marker */}
      <Marker position={markerPosition}>
        <Popup>
          **Hello from the Map!** <br /> Using the NPM installed assets.
        </Popup>
      </Marker>
      
    </MapContainer>
  );
};

export default MapComponent;