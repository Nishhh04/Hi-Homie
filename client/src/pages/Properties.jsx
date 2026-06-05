// pages/Properties.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { AuthContext } from "../context/AuthContext";

const PRICE_RANGES = [
  { label: "Any Price", min: "", max: "" },
  { label: "Below ₹10,00,000", min: 0, max: 1000000 },
  { label: "₹10L - ₹30L", min: 1000000, max: 3000000 },
  { label: "₹30L - ₹60L", min: 3000000, max: 6000000 },
  { label: "₹60L+", min: 6000000, max: "" },
];

const Properties = () => {
  const { token } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    priceRange: "",
  });
  const [underDealFilter, setUnderDealFilter] = useState("");
  const navigate = useNavigate();

  // ✅ Single unified useEffect
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const selectedRange = PRICE_RANGES[filters.priceRange] || {};

        const res = await axios.get("https://hi-homie.onrender.com/api/properties", {
          params: {
            city: filters.city || undefined,
            type: filters.type || undefined,
            minPrice: selectedRange.min || undefined,
            maxPrice: selectedRange.max || undefined,
            underDeal: underDealFilter !== "" ? underDealFilter : undefined,
          },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        // ✅ Handle both array and { properties: [...] } response shapes
        const data = res.data;
        if (Array.isArray(data)) {
          setProperties(data);
        } else if (Array.isArray(data.properties)) {
          setProperties(data.properties);
        } else {
          console.warn("Unexpected API response shape:", data);
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]); // ✅ prevent crash on error
      }
    };

    fetchProperties();
  }, [token, filters, underDealFilter]); // ✅ combined dependency

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* City input */}
        <input
          type="text"
          placeholder="Enter city (e.g. Delhi, Jaipur)"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="border p-2 rounded"
        />

        {/* Type dropdown */}
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>

        {/* Price dropdown */}
        <select
          value={filters.priceRange}
          onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          className="border p-2 rounded"
        >
          {PRICE_RANGES.map((range, idx) => (
            <option key={idx} value={idx}>
              {range.label}
            </option>
          ))}
        </select>

        {/* ✅ Under Deal dropdown — now its own separate select */}
        <select
          value={underDealFilter}
          onChange={(e) => setUnderDealFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="false">Available</option>
          <option value="true">Under Deal</option>
        </select>

      </div>

      {/* Results */}
      {properties.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold text-gray-700">
            No properties found
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting filters or check back later.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onEnquire={() => navigate(`/property/${property._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;