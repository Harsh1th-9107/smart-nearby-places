const moods = [
  { label: "Work", value: "work" },
  { label: "Date", value: "date" },
  { label: "Quick Bite", value: "quick_bite" },
  { label: "Budget", value: "budget" },
];

function MoodSelector({ selectedMood, onSelect }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Select your mood</h3>

      {moods.map((mood) => (
        <button
          key={mood.value}
          onClick={() => onSelect(mood.value)}
          style={{
            marginRight: "10px",
            padding: "10px 16px",
            background:
              selectedMood === mood.value ? "#2563eb" : "#e5e7eb",
            color: selectedMood === mood.value ? "white" : "black",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;
