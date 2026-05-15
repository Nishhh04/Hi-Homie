// pages/Properties.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { AuthContext } from "../context/AuthContext";

// import { dummyProperties } from "../data/dummyProperties";

// const USE_DUMMY_DATA = true;



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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const selectedRange = PRICE_RANGES[filters.priceRange] || {};

        const res = await axios.get("http://localhost:5000/api/properties", {
          params: {
            city: filters.city || undefined,
            type: filters.type || undefined,
            minPrice: selectedRange.min || undefined,
            maxPrice: selectedRange.max || undefined,
          },
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [token, filters]); // ✅ important

  useEffect(() => {
  axios
    .get(`/properties${underDealFilter !== "" ? `?underDeal=${underDealFilter}` : ""}`)
    .then(res => setProperties(res.data));
  }, [underDealFilter]);

  return (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

    {/* Filters */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  
  {/* City dropdown */}
  <input
  type="text"
  placeholder="Enter city (e.g. Delhi, Jaipur)"
  value={filters.city}
  onChange={(e) =>
    setFilters({ ...filters, city: e.target.value })
  }
  className="border p-2 rounded"
/>


  {/* Type dropdown */}
  <select
    value={filters.type}
    onChange={(e) =>
      setFilters({ ...filters, type: e.target.value })
    }
    className="border p-2 rounded"
  >
    <option value="">All Types</option>
    <option value="buy">Buy</option>
    <option value="rent">Rent</option>
  </select>

  {/* Price dropdown */}
  <select
    value={filters.priceRange}
    onChange={(e) =>
      setFilters({ ...filters, priceRange: e.target.value })
    }
    className="border p-2 rounded"
  >
    {PRICE_RANGES.map((range, idx) => (
      <option key={idx} value={idx}>
        {range.label}
      </option>
    ))}

    <select
      value={underDealFilter}
      onChange={(e) => setUnderDealFilter(e.target.value)}
    >
      <option value="">All</option>
      <option value="false">Available</option>
      <option value="true">Under Deal</option>
    </select>

  </select>
</div>


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
        console.log("properties value:", properties);
console.log("type:", typeof properties);
console.log("isArray:", Array.isArray(properties));

        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={{
              ...property,
              images: property.images?.[0],
            }}
            onEnquire={() => navigate(`/property/${property._id}`)}
          />
        ))}
      </div>
    )}
  </div>
);
};


export default Properties;
