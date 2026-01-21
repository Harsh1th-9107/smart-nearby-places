// src/pages/Results.jsx
import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import MapView from "../components/MapView";
import FiltersDrawer from "../components/FiltersDrawer";
import { getPlaces } from "../services/placesService";

export default function Results() {
  const [places, setPlaces] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    getPlaces().then(setPlaces);
  }, []);

  return (
    <div className="px-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button className="text-sm text-gray-500 mb-1">
            ← Change Mood
          </button>
          <h1 className="text-2xl font-bold">Work Places</h1>
          <p className="text-sm text-gray-500">
            {places.length} places found within 5 km
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-4 py-2 rounded-full border bg-white shadow-sm"
          >
            {showMap ? "List" : "Map"}
          </button>

          <button
            onClick={() => setFiltersOpen(true)}
            className="px-4 py-2 rounded-full border bg-white shadow-sm"
          >
            Filters
          </button>

          <select className="px-4 py-2 rounded-full border bg-white shadow-sm">
            <option>Best Match</option>
            <option>Nearest</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>

      {/* CONTENT */}
      {showMap ? (
        <MapView places={places} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}

      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={(filters) => console.log(filters)}
      />
    </div>
  );
}
