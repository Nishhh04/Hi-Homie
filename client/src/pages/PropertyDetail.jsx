import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/800x500?text=No+Image+Available";

const PropertyDetail = () => {
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
          }
        );
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperty();
  }, [id, token]);

  if (!property)
    return <p className="text-center mt-10">Loading property...</p>;

  const isOwner = user?._id === property.owner?._id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/properties/${property._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/properties");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleUnderDeal = async () => {
  try {
    await axios.patch(
      `http://localhost:5000/api/properties/${property._id}/under-deal`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProperty(prev => ({ ...prev, underDeal: !prev.underDeal }));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};



  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      {/* Image Slider / Fallback */}
      <div className="mb-6">
        <img
          src={
            property.images?.length > 0
              ? property.images[activeImg]
              : FALLBACK_IMAGE
          }
          alt="property"
          className="w-full h-96 object-cover rounded-lg"
        />

        {property.images?.length > 0 && (
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setActiveImg(idx)}
                className={`w-24 h-20 object-cover rounded cursor-pointer border-2 ${
                  activeImg === idx ? "border-brown" : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}

        {property.images?.length === 0 && (
          <p className="text-gray-500 mt-2 text-sm">
            No images uploaded by owner
          </p>
        )}
      </div>

      {/* Property Details */}
      <h2 className="text-2xl font-semibold">
        {property.title || "Untitled Property"}
      </h2>
      <p className="mb-2">{property.description || "No description provided."}</p>

      <p className="mb-2">
        <strong>Price:</strong> ₹
        {property.price ? property.price.toLocaleString() : "N/A"}
      </p>

      <p className="mb-2">
        <strong>Type:</strong> {property.type || "N/A"}
      </p>

      <p className="mb-4">
        <strong>Bedrooms:</strong> {property.bedrooms || 0} |{" "}
        <strong>Bathrooms:</strong> {property.bathrooms || 0}
      </p>

      <p>
        <strong>Address:</strong>{" "}
        {property.location?.address || "N/A"},{" "}
        {property.location?.city || "N/A"},{" "}
        {property.location?.state || "N/A"},{" "}
        {property.location?.country || "N/A"}
      </p>  

      {/* Contact Owner */}
      <button
        onClick={() => setShowContact(!showContact)}
        className="bg-brown text-white px-6 py-2 rounded hover:opacity-90"
      >
        Contact Owner
      </button>

      {showContact && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p>
            <strong>Name:</strong> {property.owner?.name || "N/A"}
          </p>

          {user ? (
            <>
              <p>
                <strong>Email:</strong> {property.owner?.email}
              </p>

              <p>
                <strong>Phone:</strong> {property.contact?.phone}
              </p>
            </>
            ) : (
            <p className="text-sm text-gray-500">
              Login to view owner contact details
            </p>
          )}
        </div>
      )}


      {/* Owner Actions */}
      {isOwner && (
        <div className="mt-6 flex gap-4">
          Status:
          <button
            onClick={toggleUnderDeal}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
          {property.underDeal ? "Under Deal" : "Available"}
          </button>

          <button
            onClick={() => navigate(`/property/edit/${property._id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Property
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Property
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
