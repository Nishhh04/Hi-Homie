import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import fallback from "../image/house1.jpg";
import { AuthContext } from "../context/AuthContext"; // ✅ import context

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { user, wishlist, toggleWishlist } = useContext(AuthContext); // ✅ use context
  const isOwner = user && (property.ownerId === user.id || property.ownerId === user._id);

  // Navigate to property detail page
  const handleEnquire = () => {
    navigate(`/property/${property._id}`);
  };

  // Handle wishlist click
  const handleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWishlist(property._id); // ✅ call context function
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "relative", 
      }}
    >

      {property.underDeal && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "orange",
            color: "white",
            padding: "4px 8px",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: "bold"
          }}
        >
        UNDER DEAL
        </span>
      )}

      <img
        src={property.images?.[0] || fallback}
        alt={property.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3>{property.title} ({property.type})</h3>
      <p>{property.description}</p>
      <p><strong>Price:</strong> ₹{property.price?.toLocaleString() || "N/A"}</p>
      <p><strong>City:</strong> {property.location?.city || "N/A"}</p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms || 0} |{" "}
        <strong>Bathrooms:</strong> {property.bathrooms || 0}
      </p>
      <p><strong>Owner:</strong> {property.contact?.name || "N/A"}</p>

      {/* Wishlist button */}
      {!isOwner && !property.underDeal && (
      <button
        onClick={handleWishlist}
        style={{
          position: "absolute",
          top: "15px", 
          right: "15px",
          fontSize: "24px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {(wishlist??[]).includes(property._id) ? "❤️" : "🤍"}
      </button>
      )}

      {/* Enquire button */}
      <button
        disabled={property.underDeal}
        onClick={handleEnquire}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "8px",
          backgroundColor: "#844212",
          color: "white",
          borderRadius: "5px",
          cursor: property.underDeal ? "not-allowed" : "pointer",
        }}
      >
        {property.underDeal ? "Under Deal" : "Enquire"}
      </button>
    </div>
  );
};

export default PropertyCard;
