import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PropertyCard from "../components/PropertyCard";
import axios from "axios";

const Wishlist = () => {
  const { wishlist, token } = useContext(AuthContext);
  const [wishlistProperties, setWishlistProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("https://hi-homie.onrender.com/api/properties/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlistProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token, wishlist]); // re-fetch when wishlist changes

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!token) return <p className="text-center mt-10">Please login to view your wishlist.</p>;

  if (!wishlistProperties.length) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {wishlistProperties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default Wishlist;