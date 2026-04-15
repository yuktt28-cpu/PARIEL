import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // fake signup
    localStorage.setItem("user", JSON.stringify(form));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/movie");
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(to right, rgba(2,6,23,0.95), rgba(2,6,23,0.95)), url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=2070')",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "40px",
          borderRadius: "12px",
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 30px rgba(0,0,0,0.6)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Join CineVerse 🚀
        </h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Create Account ✨
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#3b82f6", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// 🎨 styles
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  background: "#1e293b",
  color: "white",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #9333ea, #7c3aed)",
  border: "none",
  borderRadius: "6px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Signup;