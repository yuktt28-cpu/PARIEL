import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    navigate("/movie");
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(to right, rgba(2,6,23,0.95), rgba(2,6,23,0.95)), url('https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2070')",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "40px",
          borderRadius: "12px",
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(0,0,0,0.6)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Welcome Back 🎬
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
              background: "#1e293b",
              color: "white",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
              background: "#1e293b",
              color: "white",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login 🚀
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;