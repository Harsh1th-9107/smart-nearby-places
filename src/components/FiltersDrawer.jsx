// src/components/FiltersDrawer.jsx

import { useState } from "react";

export default function FiltersDrawer({ open, onClose, onApply }) {
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [radius, setRadius] = useState(5);
  const [openNow, setOpenNow] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/30"
        onClick={onClose}
      />

      <div className="w-[320px] bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <span>Filters</span>
          </h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        {/* Price Level */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Price Level</p>
          <div className="flex gap-2 flex-wrap">
            {["Free", "$", "$$", "$$$", "$$$$"].map((p) => (
              <button
                key={p}
                onClick={() => setPrice(p)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  price === p
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">
            Minimum Rating: {rating}
          </p>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
        </div>

        {/* Radius (UPDATED TO 300 km) */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">
            Search Radius: {radius} km
          </p>
          <input
            type="range"
            min="1"
            max="300"
            step="1"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 km</span>
            <span>300 km</span>
          </div>
        </div>

        {/* Open Now */}
        <div className="mb-8 flex items-center justify-between bg-gray-50 p-3 rounded-xl">
          <div>
            <p className="text-sm font-medium">Open Now</p>
            <p className="text-xs text-gray-500">
              Show only open places
            </p>
          </div>
          <input
            type="checkbox"
            checked={openNow}
            onChange={() => setOpenNow(!openNow)}
            className="w-5 h-5 accent-purple-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setPrice("");
              setRating(0);
              setRadius(5);
              setOpenNow(false);
            }}
            className="flex-1 py-2 rounded-xl border"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              onApply({ price, rating, radius, openNow });
              onClose();
            }}
            className="flex-1 py-2 rounded-xl bg-purple-600 text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
