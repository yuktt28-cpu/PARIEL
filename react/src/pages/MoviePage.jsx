import "./MoviePage.css";
import { useEffect, useState } from "react";

const API_KEY = "f60ecac9e7b8f51012982719794cdb59";
const IMG = "https://image.tmdb.org/t/p/original";

export default function CineVerse() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("popular");

  const [selected, setSelected] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => setGenres(d.genres));
  }, []);

  useEffect(() => {
    let url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`;

    if (genre || year) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
      if (genre) url += `&with_genres=${genre}`;
      if (year) url += `&primary_release_year=${year}`;
    }

    fetch(url)
      .then(r => r.json())
      .then(d => setMovies(d.results));
  }, [genre, year, type]);

  const handleSearch = async (value) => {
    setSearch(value);
    if (!value) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
    );
    const data = await res.json();
    setMovies(data.results);
  };

  const getTrailer = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();
    const vid = data.results.find(v => v.type === "Trailer");
    setTrailer(vid ? vid.key : null);
  };

  return (
    <div style={{ background: "#0b0f1a", color: "#fff", minHeight: "100vh" }}>

      {/* NAV */}
      <div style={styles.nav}>
        <h2>CineVerse 🎬</h2>
        <input
          placeholder="Search movies..."
          style={styles.search}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* HERO */}
      {movies[0] && !selected && (
        <div style={styles.hero}>
          <img src={IMG + movies[0].backdrop_path} style={styles.heroImg} />
          <div style={styles.overlay}></div>

          <div style={styles.heroContent}>
            <h1>{movies[0].title}</h1>
            <p>{movies[0].overview}</p>

            <button
              style={styles.btn}
              onClick={() => {
                setSelected(movies[0]);
                getTrailer(movies[0].id);
              }}
            >
              ▶ View Details
            </button>
          </div>
        </div>
      )}

      {/* FILTERS */}
      {!selected && (
        <div style={styles.filters}>
          <select onChange={(e) => setGenre(e.target.value)}>
            <option value="">Genre</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          <select onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            {Array.from({ length: 50 }, (_, i) => 2026 - i).map(y => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <select onChange={(e) => setType(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
            <option value="now_playing">Now Playing</option>
          </select>
        </div>
      )}

      {/* MOVIES */}
      {!selected && (
  <div className="gridWrapper">
    <div className="movies-grid">
      {movies.map((m) => (
        <div key={m.id} className="card">
          <img
            src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
            className="poster"
            onClick={() => {
              setSelected(m);
              getTrailer(m.id);
            }}
          />
        </div>
      ))}
    </div>
  </div>
)}

      {/* DETAIL */}
      {selected && (
        <>
          <button style={styles.back} onClick={() => setSelected(null)}>
            ← Back
          </button>

          <div style={styles.hero}>
            <img src={IMG + selected.backdrop_path} style={styles.heroImg} />
            <div style={styles.overlay}></div>

            <div style={styles.heroContent}>
              <h1>{selected.title}</h1>
              <p>{selected.overview}</p>
            </div>
          </div>

          {trailer && (
            <div style={{ padding: 20 }}>
              <h2>🎬 Trailer</h2>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer}`}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20
  },

  search: {
    padding: 10,
    width: 300,
    borderRadius: 6
  },

  hero: {
    position: "relative",
    height: "60vh",
    overflow: "hidden"
  },

  /* 🔥 ACTUAL FIX HERE */
  heroImg: {
    position: "absolute",
    top: 0,
    left: 0, // ✅ THIS FIXES RIGHT SHIFT
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center" // ✅ PERFECT CENTER
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    pointerEvents: "none"
  },

  heroContent: {
    position: "relative",
    padding: 40,
    maxWidth: 600,
    zIndex: 2
  },

  btn: {
    background: "gold",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer"
  },

  filters: {
    display: "flex",
    gap: 10,
    padding: 20,
    marginTop: 20
  },

  gridWrapper: {
    display: "flex",
    justifyContent: "center"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    maxWidth: 1200,
    justifyContent: "center"
  },

  card: {
    width: 160,
    borderRadius: 10,
    cursor: "pointer"
  },

  back: {
    margin: 20,
    padding: 10
  }
};