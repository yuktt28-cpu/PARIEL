import { useEffect, useState } from "react";

function Watchlist() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setMovies(saved);
  }, []);

  const removeMovie = (id) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>🎬 My Watchlist</h1>

      {movies.length === 0 ? (
        <p>No movies added yet</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {movies.map((m) => (
            <div key={m.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                alt=""
                style={{ borderRadius: "10px" }}
              />

              <p>{m.title}</p>

              <button onClick={() => removeMovie(m.id)}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;