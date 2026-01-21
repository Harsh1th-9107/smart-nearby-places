import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ places }) {
  const center = [22.229, 84.932]; // fallback center

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
          >
            <Popup>
              <div className="text-sm font-medium">
                {place.name}
                <br />
                ⭐ {place.rating}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
