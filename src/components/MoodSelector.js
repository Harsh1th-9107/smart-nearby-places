// src/components/MoodSelector.js

import React from "react";

const moods = [
  { label: "Work", value: "work" },
  { label: "Date", value: "date" },
  { label: "Quick Bite", value: "quick_bite" },
  { label: "Budget", value: "budget" }
];

function MoodSelector({ selectedMood, onMoodChange }) {
  return (
    <div style={{ padding: "20px" }}>
      <h3>Select your mood</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onMoodChange(mood.value)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background:
                selectedMood === mood.value ? "#2563eb" : "#e5e7eb",
              color:
                selectedMood === mood.value ? "#fff" : "#000"
            }}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
