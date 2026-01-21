import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
            S
          </div>
          <span className="font-semibold">SpotFinder</span>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="text-purple-600 font-medium"
        >
          Login
        </button>
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
