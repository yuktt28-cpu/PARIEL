import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setImage(localStorage.getItem("profilePic") || "");
    setName(localStorage.getItem("name") || "User");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  // ✅ HANDLE IMAGE UPLOAD (NO RELOAD)
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePic", reader.result);
      setImage(reader.result);
      setSaved(true);
    };
    reader.readAsDataURL(file);
  };

  // ✅ SAVE DETAILS (NO RELOAD)
  const saveDetails = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    setSaved(true);

    // small UX feedback
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="profile-page">

      {/* 🔥 HEADER */}
      <div className="profile-header">
        <div className="avatar-wrapper">
          <img
            src={
              image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt=""
            className="profile-avatar"
          />

          <label className="avatar-overlay">
            
            <input type="file" onChange={handleUpload} hidden />
          </label>
        </div>

        <div className="profile-info">
          <h1>{name}</h1>
          
        </div>

        <label className="change-btn">
          Change Photo
          <input type="file" onChange={handleUpload} hidden />
        </label>
      </div>

      {/* ✅ SAVE MESSAGE */}
      {saved && <div className="save-msg">✔ Profile Updated</div>}

      {/* 🔥 GRID */}
      <div className="profile-grid">

        {/* ACCOUNT */}
        <div className="card">
          <h3>Account Details</h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <button onClick={saveDetails}>Save Changes</button>
        </div>

        {/* SETTINGS */}
        <div className="card">
          <h3>Quick Settings</h3>
          <p>Autoplay: ON</p>
          <p>Quality: 4K</p>
          <p>Language: English + Hindi</p>
        </div>

        {/* MULTI PROFILE */}
        <div className="card">
          <h3>Profiles</h3>

          <div className="mini-profiles">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={
                  image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
              />
            ))}
          </div>

          <button className="add">+ Add Profile</button>
        </div>

      </div>
    </div>
  );
}