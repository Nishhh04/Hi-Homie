import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import Navbar from "./components/Navbar";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import EditProperty from "./pages/EditProperty";
import MyListings from "./pages/MyListings";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./pages/Wishlist";
import UnderDeal from "./pages/UnderDeal";

function App() {
  return (
    
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/property/edit/:id" element={<EditProperty />} />
        <Route path="/my-listings" 
          element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
          }
         />
        <Route path="/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="/under-deal"
          element={
            <ProtectedRoute>
              <UnderDeal />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
