import { createContext, useState, useEffect } from "react";
import axios from "axios"; // ✅ MISSING IMPORT

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [wishlist, setWishlist] = useState([]);

  // store token
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // load wishlist on login
  useEffect(() => {
    if (token) {
      axios
        .get("/api/properties/wishlist", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setWishlist(res.data.map((p) => p._id)))
        .catch(() => setWishlist([]));
    } else {
      setWishlist([]);
    }
  }, [token]);

  // ⭐ TOGGLE WISHLIST (REQUIRED)
  const toggleWishlist = async (propertyId) => {
  try {
    await axios.post(
      `http://localhost:5000/api/properties/wishlist/${propertyId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setWishlist(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  } catch (err) {
    console.error(err);
  }
};

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    setWishlist(userData?.wishlist || []);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setWishlist([]);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        wishlist,
        toggleWishlist,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
