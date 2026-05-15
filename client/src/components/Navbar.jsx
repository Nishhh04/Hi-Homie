import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Light/Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sessionRole");
    navigate("/login");
  };

  const toggleMode = () => {
    setDarkMode((m) => {
      const next = !m;
      localStorage.setItem("darkMode", next);
      return next;
    });
  };

  // Colors based on mode
  const colors = {
    background: darkMode ? "#2C2C2C" : "#f6f3ef",
    text: darkMode ? "#f5f5f5" : "#5C4033",
    hoverText: darkMode ? "#FFD700" : "#8B4513",
    buttonBg: "#8B4513",
    buttonHover: "#A0522D",
  };

  // click-outside handler (uses single menuRef)
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // listen for click (not mousedown) so in-menu clicks fire first (navigation)
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2px 40px",
        left:0,
        right:0,
        background: colors.background,
        boxShadow: darkMode
          ? "0 2px 6px rgba(255,255,255,0.06)"
          : "0 2px 6px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "30px", color: colors.text }}>
        <Link to="/dashboard" style={{ textDecoration: "none", color: colors.text }}>
          Hi Homie
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: colors.text,
            fontWeight: "500",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.color = colors.hoverText)}
          onMouseOut={(e) => (e.target.style.color = colors.text)}
        >
          Dashboard
        </Link>

        <Link
          to="/properties"
          style={{
            textDecoration: "none",
            color: colors.text,
            fontWeight: "500",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.color = colors.hoverText)}
          onMouseOut={(e) => (e.target.style.color = colors.text)}
        >
          Properties
        </Link>

        {user ? (
          <>
            <span style={{ fontWeight: "500", color: colors.text }}>{user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "5px 12px",
                backgroundColor: colors.buttonBg,
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = colors.buttonHover)}
              onMouseOut={(e) => (e.target.style.backgroundColor = colors.buttonBg)}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              padding: "5px 12px",
              backgroundColor: colors.buttonBg,
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.buttonHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.buttonBg)}
          >
            Login
          </Link>
        )}

        {/* Single relative wrapper with menuRef: button + menu must be inside */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="text-2xl px-3 py-1"
            aria-label="Open menu"
            style={{ background: "transparent", border: "none", color: colors.text }}
          >
            &#8942;
          </button>

          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 w-44 bg-[#5C4033] text-white rounded-lg shadow-lg z-50">
              <Link
                to="/my-listings"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-black"
              >
                My Listings
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-black"
              >
                Wishlist
              </Link>

              <Link
                to="/under-deal"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-black"
              >
                Under Deal
              </Link>

              <div
                onClick={() => {
                  toggleMode();
                  setMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-700/40"
              >
                <span className="text-sm">Dark Mode</span>

                <div
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition-all ${
                    darkMode ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              <hr className="border-gray-300 my-1" />

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-300 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;