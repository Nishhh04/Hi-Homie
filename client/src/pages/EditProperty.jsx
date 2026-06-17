import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    type: "buy",
    bedrooms: 1,
    bathrooms: 1,
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `https://hi-homie.onrender.com/api/properties/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          price: res.data.price || "",
          city: res.data.city || "",
          type: res.data.type || "buy",
          bedrooms: res.data.bedrooms || 1,
          bathrooms: res.data.bathrooms || 1,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/properties");
      }
    };

    fetchProperty();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await axios.put(
        `https://hi-homie.onrender.com/api/properties/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/property/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading property...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="border p-2 w-full rounded"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
          <option value="sell">Sell</option>
        </select>

        <div className="flex gap-4">
          <input
            type="number"
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            type="number"
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-brown text-white px-6 py-2 rounded w-full transition-all duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
