import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PlaceDetails() {
  const { id } = useParams(); // fsq_id
  const navigate = useNavigate();
  const { state } = useLocation();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const fsqId = state?.fsq_id || id;

        const res = await fetch(
          `https://api.foursquare.com/v3/places/${fsqId}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_FOURSQUARE_API_KEY,
            },
          }
        );

        const data = await res.json();

        // ✅ SAFE NORMALIZATION (NO UI CHANGES)
        const normalized = {
          name: data?.name || state?.name || "Unknown Place",

          image:
            data?.photos?.[0]
              ? `${data.photos[0].prefix}original${data.photos[0].suffix}`
              : "https://images.unsplash.com/photo-1524758631624-e2822e304c36",

          rating: data?.rating || state?.rating || "N/A",
          reviews: data?.stats?.total_ratings || 0,

          price:
            data?.price === 1
              ? "$"
              : data?.price === 2
              ? "$$"
              : data?.price === 3
              ? "$$$"
              : "$$",

          distance: state?.distance
            ? `${state.distance} m`
            : "Nearby",

          open: data?.hours?.open_now ?? false,

          description:
            data?.description || "No description available.",

          amenities:
            data?.categories?.map((c) => c.name) || [],

          hours:
            data?.hours?.display
              ? [data.hours.display]
              : [],

          address:
            data?.location?.formatted_address ||
            "Address not available",

          coordinates: {
            lat:
              state?.geocodes?.main?.latitude ??
              data?.geocodes?.main?.latitude ??
              null,
            lng:
              state?.geocodes?.main?.longitude ??
              data?.geocodes?.main?.longitude ??
              null,
          },
        };

        setPlace(normalized);
      } catch (err) {
        console.error("Failed to fetch place details:", err);
        setPlace(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id, state]);

  // ✅ FINAL, BULLETPROOF MAP HANDLER
  function openInMaps() {
    // 1️⃣ Use coordinates (best)
    if (place?.coordinates?.lat && place?.coordinates?.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`;
      window.open(url, "_blank");
      return;
    }

    // 2️⃣ Fallback to address
    if (
      place?.address &&
      place.address !== "Address not available"
    ) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.address
      )}`;
      window.open(url, "_blank");
      return;
    }

    // 3️⃣ Final fallback: place name
    if (place?.name) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.name
      )}`;
      window.open(url, "_blank");
      return;
    }

    // 4️⃣ Absolute last resort
    alert("Location not available for this place");
  }

  if (loading) return <p className="p-10">Loading...</p>;
  if (!place) return <p className="p-10">Place not found</p>;

  /* =========================
     UI — UNCHANGED
     ========================= */
  return (
    <div>
      {/* HERO IMAGE */}
      <div className="relative h-[320px]">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white p-3 rounded-full"
        >
          ←
        </button>

        <div className="absolute top-6 right-6 bg-white p-3 rounded-full">
          ❤️
        </div>

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold">{place.name}</h1>
          <p>
            ⭐ {place.rating} ({place.reviews} reviews) •{" "}
            {place.price}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto p-8 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <InfoBox title="Distance" value={place.distance} />
          <InfoBox
            title="Status"
            value={place.open ? "Open Now" : "Closed"}
            green
          />
          <InfoBox title="Price Level" value={place.price} />
        </div>

        <Section title="About">{place.description}</Section>

        <Section title="Amenities">
          <div className="flex flex-wrap gap-3">
            {place.amenities.map((a) => (
              <span
                key={a}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
              >
                {a}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Opening Hours">
          {place.hours.map((h) => (
            <p key={h}>{h}</p>
          ))}
        </Section>

        <Section title="Location">
          <p>{place.address}</p>
          <button
            onClick={openInMaps}
            className="mt-3 bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Get Directions
          </button>
        </Section>
      </div>
    </div>
  );
}

/* ---------- HELPERS (UNCHANGED) ---------- */

function InfoBox({ title, value, green }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500">{title}</p>
      <p className={`font-semibold ${green ? "text-green-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
