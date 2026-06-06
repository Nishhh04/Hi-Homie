import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import House from "../image/house1.jpg";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError("Passwords don't match");

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `https://hi-homie.onrender.com/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-screen">
      <div className="w-1/3 flex flex-col justify-center items-center bg-[#f6f3ef] p-10">
        <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
        <p className="text-gray-500 text-sm mb-6 text-center">Enter your new password</p>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold text-gray-800 mb-1 text-left">New Password</label>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-800 mb-1 text-left">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {message && <p className="text-green-600 text-sm mb-3">{message} Redirecting...</p>}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
        </p>
      </div>

      <div className="w-2/3">
        <img src={House} alt="House" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ResetPassword;