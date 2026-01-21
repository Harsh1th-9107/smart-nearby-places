import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Mood() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    {
      id: "work",
      title: "Work / Study",
      subtitle: "Focus & productivity",
      gradient: "from-blue-500 to-blue-600",
      icon: "💼",
    },
    {
      id: "date",
      title: "Date / Romantic",
      subtitle: "Intimate & cozy",
      gradient: "from-pink-500 to-rose-500",
      icon: "❤️",
    },
    {
      id: "quick",
      title: "Quick Bite",
      subtitle: "Fast & convenient",
      gradient: "from-yellow-400 to-orange-500",
      icon: "⚡",
    },
    {
      id: "budget",
      title: "Budget Friendly",
      subtitle: "Great value",
      gradient: "from-green-400 to-green-600",
      icon: "💳",
    },
    {
      id: "family",
      title: "Family / Group",
      subtitle: "Spacious & welcoming",
      gradient: "from-purple-400 to-purple-600",
      icon: "👨‍👩‍👧",
    },
    {
      id: "luxury",
      title: "Luxury / Premium",
      subtitle: "Upscale experience",
      gradient: "from-orange-500 to-amber-600",
      icon: "👑",
    },
    {
      id: "chill",
      title: "Chill / Hangout",
      subtitle: "Relaxed vibes",
      gradient: "from-teal-400 to-emerald-500",
      icon: "☕",
    },
  ];

  const handleContinue = () => {
    if (!selectedMood) return;
    navigate("/results", { state: { mood: selectedMood } });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 mb-6 flex items-center gap-2"
      >
        ← Back
      </button>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          What's your mood?
        </h1>
        <p className="text-gray-500 mt-3">
          Select what you're looking for and we'll find the perfect spots
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {moods.map((mood) => (
          <div
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={`
              cursor-pointer rounded-2xl p-8 text-white shadow-lg
              bg-gradient-to-r ${mood.gradient}
              transform transition-all duration-200
              hover:scale-105
              ${selectedMood === mood.id ? "ring-4 ring-black/20" : ""}
            `}
          >
            <div className="text-4xl mb-4">{mood.icon}</div>
            <h2 className="text-xl font-semibold">{mood.title}</h2>
            <p className="opacity-90 mt-1">{mood.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mt-14">
        <button
          onClick={handleContinue}
          disabled={!selectedMood}
          className={`
            px-10 py-3 rounded-full text-white font-semibold
            transition-all duration-200
            ${
              selectedMood
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
