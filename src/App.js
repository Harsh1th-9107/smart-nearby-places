import { useState, useEffect, useMemo } from "react";
import MoodSelector from "./components/MoodSelector";
import PlaceCard from "./components/PlaceCard";
import { fetchNearbyPlaces } from "./services/placesService";
import moodToPlaceType from "./utils/moodToPlaceType";
import useUserLocation from "./hooks/useUserLocation";
import { calculateDistance } from "./utils/calculateDistance";

function App() {
  const buttonStyle = (active, color) => ({
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: active ? color : "#fff",
    color: active ? "#fff" : "#000",
    cursor: "pointer",
  });

  const [rawPlaces, setRawPlaces] = useState([]);
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);

  // SORT & FILTER STATE
  const [sortBy, setSortBy] = useState("distance");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3);

  const { location, error } = useUserLocation();

  // FETCH DATA (ONLY ON MOOD / LOCATION)
  useEffect(() => {
    if (!mood || !location) return;

    async function loadPlaces() {
      setLoading(true);

      try {
        const types = moodToPlaceType[mood];

        console.log("Mood:", mood);
        console.log("Types:", types);
        console.log("Location:", location);

        const results = await fetchNearbyPlaces({
          lat: location.lat,
          lng: location.lng,
          types,
        });

        console.log("Fetched results:", results);

        const withDistance = results.map((place) => ({
          ...place,
          distance: calculateDistance(
            location.lat,
            location.lng,
            place.lat,
            place.lng
          ),
        }));

        setRawPlaces(withDistance);
      } catch (err) {
        console.error("Failed to fetch places:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, [mood, location]);

  // FILTER + SORT (MEMOIZED)
  const places = useMemo(() => {
    let list = [...rawPlaces];

    list = list.filter(
      (p) => p.rating >= minRating && p.priceLevel <= maxPrice
    );

    if (sortBy === "distance") {
      list.sort((a, b) => a.distance - b.distance);
    }
    if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "price") {
      list.sort((a, b) => a.priceLevel - b.priceLevel);
    }

    return list;
  }, [rawPlaces, sortBy, minRating, maxPrice]);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Smart Nearby Places Recommender</h1>
      <p>Find nearby places based on your mood.</p>

      <MoodSelector selectedMood={mood} onSelect={setMood} />

      {mood && <p><b>Selected mood:</b> {mood}</p>}

      {location && (
        <p>
          <b>Your location:</b>{" "}
          {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
        </p>
      )}

      {/* SORTING */}
      <h4>Sort by</h4>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={() => setSortBy("distance")}
          style={buttonStyle(sortBy === "distance", "#2563eb")}
        >
          Nearest
        </button>
        <button
          onClick={() => setSortBy("rating")}
          style={buttonStyle(sortBy === "rating", "#2563eb")}
        >
          Best Rated
        </button>
        <button
          onClick={() => setSortBy("price")}
          style={buttonStyle(sortBy === "price", "#2563eb")}
        >
          Cheapest
        </button>
      </div>

      {/* CLEAR */}
      <button
        onClick={() => {
          setSortBy("distance");
          setMinRating(0);
          setMaxPrice(3);
        }}
        style={{
          marginBottom: "20px",
          padding: "6px 14px",
          borderRadius: "6px",
          border: "1px solid #ef4444",
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          cursor: "pointer",
        }}
      >
        Clear all filters
      </button>

      {/* FILTERS */}
      <h4>Filters</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() => setMinRating(0)}
          style={buttonStyle(minRating === 0, "#16a34a")}
        >
          All Ratings
        </button>
        <button
          onClick={() => setMinRating(4)}
          style={buttonStyle(minRating === 4, "#16a34a")}
        >
          ⭐ 4+
        </button>
        <button
          onClick={() => setMinRating(4.5)}
          style={buttonStyle(minRating === 4.5, "#16a34a")}
        >
          ⭐ 4.5+
        </button>

        <button
          onClick={() => setMaxPrice(3)}
          style={buttonStyle(maxPrice === 3, "#9333ea")}
        >
          Any Price
        </button>
        <button
          onClick={() => setMaxPrice(1)}
          style={buttonStyle(maxPrice === 1, "#9333ea")}
        >
          ₹ Cheap
        </button>
        <button
          onClick={() => setMaxPrice(2)}
          style={buttonStyle(maxPrice === 2, "#9333ea")}
        >
          ₹₹ Mid
        </button>
      </div>

      {/* RESULTS */}
      <h3 style={{ marginTop: "30px" }}>Recommended places</h3>

      {loading && <p>Loading nearby places…</p>}

      {!loading && places.length === 0 && (
        <p>No places match your filters.</p>
      )}

      <ul style={{ padding: 0 }}>
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
