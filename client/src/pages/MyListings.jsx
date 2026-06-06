import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { token } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loader state
  const [error, setError] = useState(null);     // <-- error state

  useEffect(() => {
    if (token) {
      fetchMyListings();
    }
  }, [token]);
  
  const fetchMyListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        "https://hi-homie.onrender.com/api/properties/my-listings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProperties(res.data);
    } catch (err) {
      setError("Failed to fetch properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    await axios.delete(`https://hi-homie.onrender.com/api/properties/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProperties(properties.filter((p) => p._id !== id));
  };

  return (
    <div className="p-8 w-screen min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {loading ? (
        <p>Loading your properties...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : properties.length === 0 ? (
        <p>You have not added any property yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div key={p._id} className="bg-white rounded shadow p-4">
              <img
                src={p.images?.[0] || "https://via.placeholder.com/400"} // safe fallback
                alt=""
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-2">{p.title}</h3>
              <p className="text-sm text-gray-600">
                {p.location?.city || "N/A"}, {p.location?.state || "N/A"}
              </p>
              <p className="font-semibold">₹{p.price}</p>

              <div className="flex justify-between mt-4">
                <Link
                  to={`/property/${p._id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
