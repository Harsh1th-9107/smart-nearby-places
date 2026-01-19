function PlaceCard({ place }) {
  return (
    <li style={{ marginBottom: "8px" }}>
      <strong>{place.name}</strong> ({place.type})
    </li>
  );
}

export default PlaceCard;
