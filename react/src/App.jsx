import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";

// ✅ ONLY ONE TIME
import TvPage from "./pages/TvPage";
import NewReleases from "./pages/NewReleases";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/tv" element={<TvPage />} />
        <Route path="/new" element={<NewReleases />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

