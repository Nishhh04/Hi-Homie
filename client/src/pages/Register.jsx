import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import googleLogo from "../image/google-logo.png"; 
import House from "../image/house1.jpg"; 
import { Eye, EyeOff } from "lucide-react"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!window.google) {
      alert("Google Sign-In is loading, please try again in a moment.");
      return;
    }
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "1025585098906-m4m3gjs48iqqj8a46f7p066dhl0r01t5.apps.googleusercontent.com",
      scope: "email profile",
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          alert("Google Sign-in failed");
          return;
        }
        try {
          const apiBase = import.meta.env.VITE_API_URL || "https://hi-homie.onrender.com";
          const res = await axios.post(`${apiBase}/api/auth/google-login`, {
            access_token: tokenResponse.access_token,
          });
          setUser(res.data.user);
          setToken(res.data.token);
          navigate("/dashboard");
        } catch (err) {
          alert(err.response?.data?.message || "Google Login failed");
        }
      },
    });
    client.requestAccessToken();
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <div className="text-center mb-2 text-gray-500">or</div>
            <button
              type="button"
              onClick={handleGoogleLogin}
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
