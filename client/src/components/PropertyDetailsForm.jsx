import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PropertyDetailsForm = ({ form, setForm, onNext }) => {
  const { token } = useContext(AuthContext);
  const [imageError, setImageError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => {
      const totalImages = [...prev.images, ...files];

      if (totalImages.length > MAX_IMAGES) {
        alert(`You can upload max ${MAX_IMAGES} images`);
        return prev;
      }

      return {
        ...prev,
        images: totalImages,
      };
    });
  };

  return (
    <form>
      {/* Title */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Description <span className="text-red-600">*</span>
        </label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Price <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      {/* Address */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Address <span className="text-red-600">*</span>
        </label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      {/* Location */}
      <div className="mb-4 flex items-start gap-4">
        <label className="w-32 text-left font-medium text-black">
            Location <span className="text-red-600">*</span>
        </label>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
            required
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
            required
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City / District"
            className="px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
            required
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
            Bedrooms <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      {/* Bathrooms */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
            Bathrooms <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      {/* Type */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
            Type <span className="text-red-600">*</span>
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
        >
          <option value="sell">Sell</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      {/* Images */}
      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Property Image <span className="text-red-600">*</span>
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="flex-1 text-white"
        />
      </div>
      {imageError && (
        <p className="ml-36 text-sm text-red-500">{imageError}</p>
      )}

      <div className="grid grid-cols-3 gap-3 mt-3">
        {form.images.map((img, index) => (
          <img
            key={index}
            src={URL.createObjectURL(img)}
            alt="preview"
            className="h-24 w-full object-cover rounded"
          />
        ))}
      </div>


      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onNext}
          className="bg-[#5C4033] text-white py-2 px-4 rounded-md hover:bg-[#3e2a21ff]"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default PropertyDetailsForm;
