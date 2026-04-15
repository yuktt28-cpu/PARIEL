import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_KEY = "f60ecac9e7b8f51012982719794cdb59";
const IMG = "https://image.tmdb.org/t/p/original";

export default function Home() {
  const navigate = useNavigate();

  // ✅ FIXED (moved inside component)
  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("popular");

  const [selected, setSelected] = useState(null);
  const [trailer, setTrailer] = useState(null);

  // 🎬 GENRES
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => setGenres(d.genres || [])); // ✅ safety
  }, []);

  // 🎬 MOVIES
  useEffect(() => {
    let url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&page=${page}`;

    if (genre || year) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
      if (genre) url += `&with_genres=${genre}`;
      if (year) url += `&primary_release_year=${year}`;
    }

    fetch(url)
      .then(r => r.json())
      .then(d => setMovies(d.results || [])); // ✅ safety
  }, [genre, year, type, page]);

  // 🔍 SEARCH
  const handleSearch = async (value) => {
    setSearch(value);
    if (!value) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
    );
    const data = await res.json();
    setMovies(data.results || []); // ✅ safety
  };

  // 🎥 TRAILER
  const getTrailer = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();
    const vid = data.results?.find(v => v.type === "Trailer");
    setTrailer(vid ? vid.key : null);
  };

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <img src="/your-image.jpg" alt="bg" />
        <div className="overlay"></div>

        <div className="hero-content">

          {/* SEARCH */}
          <div className="search-container">
            <input
              placeholder="Search movies..."
              className="hero-search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <h1>Chashm-e-Zauq</h1>

          <div className="badges">
            <span onClick={() => setType("popular")}>U/A 16+</span>
            <span onClick={() => setType("top_rated")}>Trending</span>
            <span onClick={() => setType("now_playing")}>IMAX</span>
            <span onClick={() => setType("upcoming")}>4K HDR</span>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      {!selected && (
        <div className="filters">

          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">🎭 Genre</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">📅 Year</option>
            {Array.from({ length: 30 }, (_, i) => 2026 - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="popular">🔥 Popular</option>
            <option value="top_rated">⭐ Top Rated</option>
            <option value="upcoming">🎬 Upcoming</option>
            <option value="now_playing">🎥 Now Playing</option>
          </select>

        </div>
      )}

      {/* MOVIES GRID */}
      {!selected && (
        <div className="movies-grid">
          {movies.map((m) => (
            <div key={m.id} className="card">
              <img
                src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                onClick={() => {
                  setSelected(m);
                  getTrailer(m.id);
                }}
                alt={m.title}
              />
            </div>
          ))}
        </div>
      )}

      {/* DETAIL */}
      {selected && (
        <>
          <button className="back" onClick={() => setSelected(null)}>
            ← Back
          </button>

          <div className="hero">
            <img src={IMG + selected.backdrop_path} alt="" />
            <div className="overlay"></div>

            <div className="hero-content">
              <h1>{selected.title}</h1>
              <p>{selected.overview}</p>
            </div>
          </div>

          {trailer && (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer}`}
              allowFullScreen
              title="trailer"
            ></iframe>
          )}
        </>
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
          ◀
        </button>

        <span
          className={page === 1 ? "active" : ""}
          onClick={() => setPage(1)}
        >
          1
        </span>

        <span
          className={page === 2 ? "active" : ""}
          onClick={() => setPage(2)}
        >
          2
        </span>

        <span className="dots">...</span>

        <button onClick={() => setPage(prev => prev + 1)}>
          ▶
        </button>
      </div>

    </div>
  );
}