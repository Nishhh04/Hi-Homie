import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const FALLBACK_IMAGE = "https://via.placeholder.com/800x500?text=No+Image+Available";

const PropertyDetail = () => {
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // ✅ modal state
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id, token]);

  if (!property) return <p className="text-center mt-10">Loading property...</p>;

  const isOwner = user?.id === property.ownerId?.toString();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/properties/${property._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  // ✅ Open modal and prefill form
  const openEditModal = () => {
    setEditForm({
      title: property.title || "",
      description: property.description || "",
      price: property.price || "",
      city: property.location?.city || "",
      type: property.type || "sell",
      bedrooms: property.bedrooms || 1,
      bathrooms: property.bathrooms || 1,
    });
    setShowEditModal(true);
  };

  // ✅ Save edited property
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/properties/${property._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProperty(res.data); // update page with new data
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      {/* Image Slider */}
      <div className="mb-6">
        <img
          src={property.images?.length > 0 ? property.images[activeImg] : FALLBACK_IMAGE}
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
      </div>

      {/* Property Details */}
      <h2 className="text-2xl font-semibold">{property.title || "Untitled Property"}</h2>
      <p className="mb-2">{property.description || "No description provided."}</p>
      <p className="mb-2"><strong>Price:</strong> ₹{property.price?.toLocaleString() || "N/A"}</p>
      <p className="mb-2"><strong>Type:</strong> {property.type || "N/A"}</p>
      <p className="mb-4">
        <strong>Bedrooms:</strong> {property.bedrooms || 0} |{" "}
        <strong>Bathrooms:</strong> {property.bathrooms || 0}
      </p>
      <p className="mb-4">
        <strong>Address:</strong> {property.location?.address || "N/A"},{" "}
        {property.location?.city || "N/A"}, {property.location?.state || "N/A"},{" "}
        {property.location?.country || "N/A"}
      </p>

      {/* Contact Owner */}
      <div className="mt-6 flex gap-3">
        {!isOwner && (
          user ? (
            <>
              <a href={`tel:${property.contact?.phone}`} className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90" style={{ backgroundColor: "#583a18" }}>Call Now</a>
              <a href={`mailto:${property.contact?.email}`} className="px-6 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50">Enquire</a>
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="px-6 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: "#844212" }}>Login to Contact Owner</button>
          )
        )}
      </div>

      {/* Owner Actions */}
      {isOwner && (
        <div className="mt-6 flex gap-4">
          Status:
          <button onClick={toggleUnderDeal} className="bg-green-600 text-white px-4 py-2 rounded">
            {property.underDeal ? "Under Deal" : "Available"}
          </button>
          <button onClick={openEditModal} className="bg-blue-600 text-white px-4 py-2 rounded">
            Edit Property
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete Property
          </button>
        </div>
      )}

      {/* ✅ Edit Modal */}
      {/* ✅ Edit Modal - Themed */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 pt-12">
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-8"
            style={{
              background: "rgba(123, 77, 55, 0.5)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(171, 65, 16, 0.15)"
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Property</h2>
              <button onClick={() => setShowEditModal(false)} className="text-white/70 hover:text-white text-2xl font-bold">✕</button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">

              {/* Title */}
              <div className="flex items-center gap-3">
                <label className="w-24 text-white text-sm font-medium shrink-0">Title <span className="text-red-400">*</span></label>
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/10"
                  placeholder="Property title"
                  required
                />
              </div>

              {/* Description */}
              <div className="flex items-start gap-3">
                <label className="w-24 text-white text-sm font-medium shrink-0 mt-2">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/10 resize-none"
                  placeholder="Describe the property"
                />
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <label className="w-24 text-white text-sm font-medium shrink-0">Price (₹) <span className="text-red-400">*</span></label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/10"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* City */}
              <div className="flex items-center gap-3">
                <label className="w-24 text-white text-sm font-medium shrink-0">City <span className="text-red-400">*</span></label>
                <input
                  value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/10"
                  placeholder="City"
                  required
                />
              </div>

              {/* Type */}
              <div className="flex items-center gap-3">
                <label className="w-24 text-white text-sm font-medium shrink-0">Type <span className="text-red-400">*</span></label>
                <select
                  value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#5C4033] text-white focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/10"
                >
                  <option value="buy">Sell</option>
                  <option value="rent">Rent</option>
                </select>
              </div>

              {/* Beds & Baths - FIXED */}
              <div className="flex items-center gap-3">
                <label className="w-24 text-white text-sm font-medium shrink-0">Beds/Baths <span className="text-red-400">*</span></label>
                <div className="flex gap-2 flex-1 min-w-0">
                  <input
                    type="number"
                    value={editForm.bedrooms}
                    onChange={(e) => setEditForm({ ...editForm, bedrooms: e.target.value })}
                    className="w-1/2 px-3 py-2 rounded-lg bg-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/10"
                    placeholder="Beds"
                    min={0}
                  />
                  <input
                    type="number"
                    value={editForm.bathrooms}
                    onChange={(e) => setEditForm({ ...editForm, bathrooms: e.target.value })}
                    className="w-1/2 px-3 py-2 rounded-lg bg-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/10"
                    placeholder="Baths"
                    min={0}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 rounded-lg text-white font-semibold transition hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.25)" }}
                >
                  {saving ? "Saving..." : "Update Property"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;