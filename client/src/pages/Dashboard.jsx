import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link,useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Hero from "../components/Hero";
import { Home, DollarSign, Building, HeartHandshake,Plus} from "lucide-react";
import CTAImage from "../image/real-estate.png";


const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState({ type: "all", city: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, [token]);

  const filteredProperties = properties.filter(
    (p) =>
      (filter.type === "all" || p.type === filter.type) &&
      (filter.city === "" ||
        p.city.toLowerCase().includes(filter.city.toLowerCase()))
  );

  const handleProtectedNavigation = (path) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f6f3ef]">
      {/* HERO */}
      <Hero />

      {/*Login */}
      <div className="w-full flex justify-center my-12">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* Left Content */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="w-full h-12 rounded-full flex items-center justify-center mb-6">
            <HeartHandshake className="text-green-600" size={46} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Real Estate Platform
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Login to create property listings, send inquiries, and manage your
            real estate portfolio. Start your journey with us today.
          </p>

          <Link to="/login">
            <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition">
              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-green-600 items-bold" />
              </span>

              Login to Get Started
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 hidden md:block">
          <img
            src={CTAImage}
            alt="Real estate"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>

      {/* OUR SERVICES */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-3xl md:text-4xl font-semibold text-[#5a3e2b] mb-10 text-center">
            Explore Our Core Services
          </h2>

          <div className="overflow-x-auto px-6">
            <div className=" grid grid-cols-3 gap-x-12 gap-y-8 items-stretch">
              {/* Card 1 - Buy a Home */}
              <div
                className="rounded-2xl p-8 shadow-lg flex flex-col justify-between h-full"
                style={{ backgroundColor: "rgba(132,66,18,0.06)" }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Home className="text-[#5a3e2b]" size={36} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#3a2b22]">Buy a Home</h3>
                  <p className="text-sm text-[#4b4b4b] max-w-xl">
                    Explore listings, virtual tours, and tools to find your perfect home easily.
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link
                    to="/properties"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-[#5a3e2b] text-[#5a3e2b] bg-white/90 shadow-sm hover:shadow transition text-sm"
                  >
                    Browse Properties
                  </Link>
                </div>
              </div>

              {/* Card 2 - Sell Your Property */}
              <div
                className="rounded-2xl p-8 shadow-lg flex flex-col justify-between h-full"
                style={{ backgroundColor: "rgba(141,210,3,0.06)" }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
                    <DollarSign className="text-[#3f6216]" size={36} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2f3f20]">Sell Your Property</h3>
                  <p className="text-sm text-[#4b4b4b] max-w-xl">
                    Get expert tips and valuation support to sell your property successfully.
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleProtectedNavigation("/add-property")}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-[#3f6216] text-[#3f6216] bg-white/90 shadow-sm hover:shadow transition text-sm"
                  >
                  Sell Now
                  </button>
                </div>
              </div>

              {/* Card 3 - Rent a Place */}
              <div
                className="rounded-2xl p-8 shadow-lg flex flex-col justify-between h-full"
                style={{ backgroundColor: "rgba(132,66,18,0.06)" }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Building className="text-[#5a3e2b]" size={36} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#3a2b22]">Rent a Place</h3>
                  <p className="text-sm text-[#4b4b4b] max-w-xl">
                    Browse thousands of rental listings and apply online with ease.
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link
                    to="/properties?filter=rent"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full border-2 border-[#5a3e2b] text-[#5a3e2b] bg-white/90 shadow-sm hover:shadow transition text-sm"
                  >
                    Find Rentals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="w-screen py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a3e2b]">
              Featured Properties
            </h2>
            <p className="mt-3 text-[#6b7280] max-w-xl">
              Hand-picked homes you might love — curated by your homie.
            </p>
          </div>

          {/* View All Button */}
          <Link
            to="/properties"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#5a3e2b] font-medium hover:underline"
          >
            View All Properties
          <span className="text-xl">→</span>
          </Link>
        </div>

          {/* Property Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.length > 0 ? (
              filteredProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-500 py-20">
              No properties found at the moment. Please check back later!
            </div>
            )}
          </div>
        </div>
      </section>


      
      {/* FOOTER (updated links) */}
      <footer className="bg-[#f3f7fa] mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand / About */}
          <div>
            <h3 className="text-2xl font-bold text-[#1866a1]">Hi Homie</h3>
            <p className="mt-4 text-sm text-[#374151] leading-relaxed">
              Discover your next home with confidence. Verified listings, interactive maps,
              secure transactions, and user-driven reviews — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#1866a1] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#374151]">
              {/* Home now links explicitly to the dashboard route */}
              <li>
                <Link to="/dashboard" className="hover:underline text-[#0b66a8]">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:underline">Properties</Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold text-[#1866a1] mb-3">Contact Us</h4>
            <p className="text-sm text-[#374151]">
              <a href="mailto:hihomie.support@gmail.com" className="hover:underline">hihomie.support@gmail.com</a>
            </p>
            <p className="text-sm text-[#374151] mt-2">1023456789</p>
            <p className="text-sm text-[#374151] mt-1">WhatsApp: 1023456789</p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-[#1866a1] mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-[#374151]">
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center gap-6">
            <a href="#" aria-label="facebook" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1866a1]">f</a>
            <a href="#" aria-label="instagram" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1866a1]">◎</a>
            <a href="#" aria-label="linkedin" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1866a1]">in</a>
            <a href="#" aria-label="github" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1866a1]">GH</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;