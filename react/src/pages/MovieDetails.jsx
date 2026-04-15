import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = "f60ecac9e7b8f51012982719794cdb59";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      });
  }, [id]);

  // 🎬 SAVE PROGRESS
  const saveProgress = () => {
    const list = JSON.parse(localStorage.getItem("continue")) || [];

    const updated = list.filter((m) => m.id !== movie.id);

    updated.push({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
    });

    localStorage.setItem("continue", JSON.stringify(updated));
  };

  if (!movie) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <div style={{ background: "#0b0f1a", color: "white", minHeight: "100vh" }}>
      
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px",
          background: "#000",
          color: "white",
          border: "none",
        }}
      >
        ← Back
      </button>

      {/* HERO */}
      <div
        style={{
          height: "80vh",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "40px", maxWidth: "600px" }}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>

          <button
            onClick={() => {
              setShowPlayer(true);
              saveProgress();
            }}
            style={{
              padding: "12px 20px",
              background: "#e50914",
              color: "white",
              border: "none",
              marginTop: "10px",
            }}
          >
            ▶ Play
          </button>
        </div>
      </div>

      {/* 🎥 PLAYER */}
      {showPlayer && (
        <div style={{ padding: "20px" }}>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;