// src/services/placesService.js

export async function fetchNearbyPlaces({ lat, lng, types }) {
  console.log("fetchNearbyPlaces called with:", { lat, lng, types });

  // simulate API delay
  await new Promise((res) => setTimeout(res, 500));

  // HARD GUARANTEED DATA (no empty arrays)
  return types.map((type, index) => ({
    id: `${type}-${index}`,
    name: `${type.replace("_", " ")} near you`,
    type,
    lat: lat + Math.random() * 0.01,
    lng: lng + Math.random() * 0.01,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5–5.0
    priceLevel: Math.floor(Math.random() * 3) + 1, // 1–3
  }));
}
