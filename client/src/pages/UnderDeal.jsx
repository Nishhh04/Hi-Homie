import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UnderDeal = () => {
  const { token, user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnderDeal = async () => {
      try {
        const res = await axios.get("https://hi-homie.onrender.com/api/properties", {
          params: { underDeal: "true" },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = res.data;
        setProperties(Array.isArray(data) ? data : data.properties || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnderDeal();
  }, [token]);

  const handleToggle = async (property) => {
    try {
      await axios.patch(
        `https://hi-homie.onrender.com/api/properties/${property._id}/under-deal`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Remove from list since it's no longer under deal
      setProperties(prev => prev.filter(p => p._id !== property._id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen w-full bg-[#f6f3ef] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#5a3e2b] mb-8">
          Properties Under Deal
        </h1>

        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <p className="text-gray-500">No properties currently under deal.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => {
              const isOwner = user?.id === p.ownerId?.toString();

              return (
                <div key={p._id} className="bg-white rounded-xl shadow p-4">
                  <img
                    src={p.images?.[0] || "https://via.placeholder.com/400"}
                    alt={p.title}
                    className="h-40 w-full object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-lg text-[#5a3e2b]">{p.title}</h3>
                  <p className="text-sm text-gray-500">
                    {p.location?.city}, {p.location?.state}
                  </p>
                  <p className="font-semibold text-gray-700 mt-1">
                    ₹{p.price?.toLocaleString()}
                  </p>

                  {/* Under Deal badge */}
                  <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                    Under Deal
                  </span>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/property/${p._id}`)}
                      className="flex-1 py-2 rounded-lg border border-[#5C4033] text-[#5C4033] text-sm hover:bg-[#5C4033] hover:text-white transition"
                    >
                      View
                    </button>

                    {/* ✅ Only owner sees this toggle */}
                    {isOwner && (
                      <button
                        onClick={() => handleToggle(p)}
                        className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
                      >
                        Mark Available
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnderDeal;