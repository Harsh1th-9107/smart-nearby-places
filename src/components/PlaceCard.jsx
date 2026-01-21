import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlaceCard({ place }) {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();

  // ---------- SAFE NORMALIZATION ----------
  const name = place && place.name ? place.name : "Unknown Place";

  const rating =
    place && typeof place.rating === "number"
      ? place.rating.toFixed(1)
      : "N/A";

  const image =
    (place && place.image) ||
    (place && place.photos && place.photos[0]) ||
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836";

  // ✅ Distance (supports meters or km)
  let distance = "Nearby";
  if (place && typeof place.distance === "number") {
    distance =
      place.distance > 1000
        ? `${(place.distance / 1000).toFixed(2)} km`
        : `${place.distance} m`;
  } else if (place && place.distance_km) {
    distance = `${place.distance_km} km`;
  }

  let type = "Place";
  if (place && place.type) {
    type = place.type;
  } else if (place && place.category) {
    type = place.category;
  } else if (place && place.categories && place.categories[0]) {
    type = place.categories[0].name;
  } else if (place && place.types && place.types[0]) {
    type = place.types[0].replaceAll("_", " ");
  }

  // 🔒 PRICE — unchanged logic
  let price = "$$";
  if (place && place.price) {
    price = place.price;
  } else if (place && place.price_level === 1) {
    price = "$";
  } else if (place && place.price_level === 2) {
    price = "$$";
  } else if (place && place.price_level === 3) {
    price = "$$$";
  }

  // ✅ Description (SAFE, OPTIONAL)
  const description =
    (place && place.description) ||
    (place && place.about) ||
    "";

  // ✅ Tags priority: tags → amenities → categories → fallback
  let tags = ["WiFi", "Quiet"];
  if (place && place.tags && place.tags.length) {
    tags = place.tags;
  } else if (place && place.amenities && place.amenities.length) {
    tags = place.amenities;
  } else if (place && place.categories && place.categories.length) {
    tags = place.categories.map((c) => c.name);
  }

  let openNow = false;
  if (place && place.openNow !== undefined) {
    openNow = place.openNow;
  } else if (
    place &&
    place.opening_hours &&
    place.opening_hours.open_now !== undefined
  ) {
    openNow = place.opening_hours.open_now;
  } else if (place && place.hours && place.hours.open_now !== undefined) {
    openNow = place.hours.open_now;
  }

  // ---------- UI (UNCHANGED STRUCTURE) ----------
  return (
    <div
      className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden relative cursor-pointer"
      onClick={() =>
        navigate(`/place/${place?.fsq_id || place?.id}`, {
          state: place,
        })
      }
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-48 w-full object-cover"
        />

        {/* Rating */}
        {rating !== "N/A" && (
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-sm flex items-center gap-1 shadow">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            {rating}
          </div>
        )}

        {/* Open Now */}
        {openNow && (
          <div className="absolute top-3 left-20 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
            Open Now
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFav(!fav);
          }}
          className="absolute top-3 right-3"
        >
          <Heart
            size={20}
            className={
              fav ? "fill-red-500 text-red-500" : "text-white"
            }
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <span className="text-sm text-gray-500">{price}</span>
        </div>

        {/* ✅ DESCRIPTION (NEW, UI-SAFE) */}
        {description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {description}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-3">
          {distance} • {type}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
