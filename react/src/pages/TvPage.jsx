import { useEffect, useState } from "react";

export default function TvPage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=YOUR_API_KEY`)
      .then(res => res.json())
      .then(data => setShows(data.results));
  }, []);

  return (
    <div>
      <h1>📺 TV Shows</h1>

      <div className="grid">
        {shows.map(show => (
          <img
            key={show.id}
            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
}