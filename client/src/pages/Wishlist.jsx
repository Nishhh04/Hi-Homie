import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PropertyCard from "../components/PropertyCard";

const Wishlist = () => {
  const { wishlist=[], properties=[] } = useContext(AuthContext);

  // Filter only properties that are in wishlist
  const wishlistProperties = properties.filter((p) =>  wishlist.some(w => w._id === p._id));

  if (!properties || !wishlist) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!wishlistProperties.length) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {wishlistProperties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default Wishlist;
