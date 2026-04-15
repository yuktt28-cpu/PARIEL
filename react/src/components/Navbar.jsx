import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // ✅ GET PROFILE DATA
  const profilePic = localStorage.getItem("profilePic");
  const userName = localStorage.getItem("name") || "Profile";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      
      {/* 🔥 LOGO */}
      <h2 style={styles.logo}>PARIEL</h2>

      <div style={styles.right}>
        {isLoggedIn ? (
          <>
            <Link to="/" style={styles.link}>Home</Link>
        
            <Link to="/movie" style={styles.link}>
              Movies
            </Link>
        
            <Link to="/tv" style={styles.link}>
              TV Shows
            </Link>
        
            <Link to="/new" style={styles.link}>
              New Releases
            </Link>
        
            <Link to="/watchlist" style={styles.link}>
              Watchlist 🎬
            </Link>

            {/* ✅ PROFILE WITH IMAGE + NAME */}
            <Link to="/profile" style={{...styles.link, display: "flex", alignItems: "center", gap: "6px"}}>
              <img
                src={
                  profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid gold",
                }}
              />
              {userName}
            </Link>
        
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",

    background: "rgba(2, 6, 23, 0.8)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    borderBottom: "1px solid rgba(255,255,255,0.08)",
    color: "white",
  },

  logo: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "2px",

    background:
      "linear-gradient(90deg, #00ffcc, #f5c518, #ff2e63, #ff6ec7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",

    textShadow: "0 0 12px rgba(255, 200, 0, 0.4)",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  link: {
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.3s",
  },

  logout: {
    background: "linear-gradient(135deg, #ff2e63, #f5c518)",
    border: "none",
    padding: "6px 14px",
    color: "white",
    cursor: "pointer",
    borderRadius: "20px",
    fontWeight: "600",
    transition: "0.3s",
  },
};

export default Navbar;