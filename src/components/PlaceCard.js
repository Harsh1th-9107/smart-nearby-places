function PlaceCard({ place }) {
  return (
    <li
      style={{
        listStyle: "none",
        padding: "14px 16px",
        marginBottom: "14px",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {/* TITLE */}
      <span style={{ fontWeight: "600", fontSize: "16px" }}>
        {place.name}
      </span>

      {/* TYPE */}
      <span style={{ fontSize: "13px", color: "#6b7280" }}>
        {place.type.replace("_", " ")}
      </span>

      {/* RATING + PRICE */}
      <span style={{ fontSize: "13px" }}>
        ⭐ {place.rating} • {"₹".repeat(place.priceLevel)}
      </span>

      {/* DISTANCE */}
      <span style={{ fontSize: "12px", color: "#6b7280" }}>
        {place.distance.toFixed(2)} km away
      </span>

      {/* MAP EMBED */}
      <div
        style={{
          width: "100%",
          height: "180px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          marginTop: "8px",
        }}
      >
        <iframe
          title={`map-${place.id}`}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${place.lat},${place.lng}&z=15&output=embed`}
          style={{ border: 0 }}
        />
      </div>

      {/* OPEN IN MAPS */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "6px",
          fontSize: "13px",
          color: "#2563eb",
          textDecoration: "none",
          fontWeight: "500",
          alignSelf: "flex-start",
        }}
      >
        Open in Google Maps →
      </a>
    </li>
  );
}

export default PlaceCard;
