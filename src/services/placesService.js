// src/services/placesService.js

export async function getPlaces() {
  return [
    {
      // ✅ INTERNAL ID (used in URL)
      id: "focus_lab_1",

      // ✅ REAL FOURSQUARE ID (used ONLY for API)
      fsq_id: "4b0588b6f964a520c9b222e3",

      name: "Focus Lab",
      rating: 4.6,

      // 🔒 BACKWARD COMPATIBILITY
      lat: 22.229,
      lng: 84.932,

      // ✅ MAP + DETAILS
      coordinates: {
        lat: 22.229,
        lng: 84.932,
      },

      price: "$$",
      distance: 1600,
      category: "Coworking",
      categories: [{ name: "Coworking" }],
      description:
        "Dedicated study space with library ambience. Perfect for students and remote workers.",
      amenities: ["WiFi", "Quiet", "24/7"],
      openNow: true,
      photos: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      ],
    },

    {
      id: "brew_books_2",
      fsq_id: "4b0588b6f964a520c9b222e4",
      name: "Brew & Books",
      rating: 4.7,
      lat: 22.232,
      lng: 84.935,
      coordinates: {
        lat: 22.232,
        lng: 84.935,
      },
      price: "$$",
      distance: 2800,
      category: "Cafe",
      categories: [{ name: "Cafe" }],
      description:
        "Literary-themed cafe with quiet ambiance, ideal for reading and remote work.",
      amenities: ["WiFi", "Quiet", "Books"],
      openNow: true,
      photos: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      ],
    },

    {
      id: "daily_grind_3",
      fsq_id: "4b0588b6f964a520c9b222e5",
      name: "Daily Grind Cafe",
      rating: 4.5,
      lat: 22.227,
      lng: 84.928,
      coordinates: {
        lat: 22.227,
        lng: 84.928,
      },
      price: "$$",
      distance: 3500,
      category: "Cafe",
      categories: [{ name: "Cafe" }],
      description:
        "Cozy neighborhood cafe with artisan coffee and laptop-friendly seating.",
      amenities: ["WiFi", "Quiet", "Laptop Friendly"],
      openNow: false,
      photos: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      ],
    },
  ];
}
