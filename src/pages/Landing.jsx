import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
            S
          </div>
          <span className="text-lg font-semibold text-purple-700">
            SpotFinder
          </span>
        </div>

        <div className="flex items-center gap-4 text-purple-700">
          <button
            onClick={() => navigate("/login")}
            className="hover:opacity-80"
            title="Login"
          >
            👤
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        {/* ICON */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg mb-6">
          📍
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-600 leading-tight">
          Discover Places
          <br />
          That Match Your Mood
        </h1>

        {/* SUBTITLE */}
        <p className="mt-4 text-gray-600 max-w-xl">
          Smart recommendations for cafes, restaurants, and spots nearby
          based on what you're looking for right now.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-105 transition"
          >
            📍 Find Places Near Me
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Search Manually
          </button>
        </div>

        {/* FOOTER TEXT */}
        <p className="mt-6 text-sm text-gray-400">
          Welcome back, jack!
        </p>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-400 py-4">
        Made with care for urban explorers
      </footer>
    </div>
  );
}
