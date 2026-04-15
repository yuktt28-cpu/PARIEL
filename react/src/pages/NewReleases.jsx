import { useEffect, useState } from "react";

export default function NewReleases() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h1>🔥 New Releases</h1>

      <div className="grid">
        {movies.map(m => (
          <img
            key={m.id}
            src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}