import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import googleLogo from "../image/google-logo.png"; 
import House from "../image/house1.jpg"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionRole, setSessionRole] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hi-homie.onrender.com/api/auth/login", { email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("sessionRole", sessionRole);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex w-screen">
      {/* Left side - Form */}
      <div className="w-1/3 flex flex-col justify-center items-center bg-[#f6f3ef] p-10">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-bg font-bold text-gray-800 mb-1 text-left">
            E-mail
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-bg font-bold text-gray-800 mb-1 text-left">
            Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mb-4">
            <select
              value={sessionRole}
              onChange={(e) => setSessionRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
            <option value="" disabled>
            Purpose?
            </option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors mb-4"
          >
            Login
          </button>
          <div className="text-center mb-2 text-gray-500">or</div>
          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
            Login with Google
          </button>
        </form>

        {/* New homie? Register */}
        <p className="mt-6 text-sm text-gray-600">
          New homie? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="w-2/3">
        <img
          src={House} // replace with your image path
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
