import { Map, Filter } from "lucide-react";
import { useState } from "react";

export default function ResultsRightControls({
  sortBy,
  setSortBy,
  filters,
  setFilters,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-end gap-3">
      {/* Top buttons */}
      <div className="flex gap-2">
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm">
          <Map size={16} /> Map
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm"
        >
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-full text-sm"
      >
        <option value="best">Best Match</option>
        <option value="distance">Distance</option>
        <option value="rating">Rating</option>
      </select>

      {/* Filters Panel */}
      {open && (
        <div className="absolute top-16 right-0 bg-white border rounded-xl shadow-lg p-4 w-52 z-50">
          <h4 className="text-sm font-semibold mb-3">Filters</h4>

          <label className="flex items-center gap-2 mb-2 text-sm">
            <input
              type="checkbox"
              checked={filters.wifi}
              onChange={(e) =>
                setFilters({ ...filters, wifi: e.target.checked })
              }
            />
            WiFi
          </label>

          <label className="flex items-center gap-2 mb-2 text-sm">
            <input
              type="checkbox"
              checked={filters.quiet}
              onChange={(e) =>
                setFilters({ ...filters, quiet: e.target.checked })
              }
            />
            Quiet
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.open}
              onChange={(e) =>
                setFilters({ ...filters, open: e.target.checked })
              }
            />
            Open Now
          </label>
        </div>
      )}
    </div>
  );
}
