import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mood from "./pages/Mood";
import Results from "./pages/Results";
import PlaceDetails from "./pages/PlaceDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mood" element={<Mood />} />
      <Route path="/results" element={<Results />} />
      <Route path="/place/:id" element={<PlaceDetails />} />
    </Routes>
  );
}
