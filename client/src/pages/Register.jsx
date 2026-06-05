import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import googleLogo from "../image/google-logo.png"; 
import House from "../image/house1.jpg"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://hi-homie.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registered successfully! Login now.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (

    <div className="flex min-h-screen w-screen overflow-x-hidden ">
      {/* Left Side - Form */}
      <div className="w-1/3 flex-1 flex flex-col justify-center items-center bg-[#f6f3ef] p-10">
        <h2 className="text-3xl font-bold mb-6">Register</h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-bg font-bold text-gray-800 mb-1 text-left">
            Name
            </label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-bg font-bold text-gray-800 mb-1 text-left">
            E-mail
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-bg font-bold text-gray-800 mb-1 text-left">
            Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Register
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

        <p className="mt-6 text-sm text-gray-600">
          Already a homie?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Right Side - Image */}
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

export default Register;
