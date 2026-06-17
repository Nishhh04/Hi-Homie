import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PropertyDetailsForm from "../components/PropertyDetailsForm"; // your existing form
import OwnerDetailsForm from "../components/OwnerDetailsForm";
import House from "../image/img3.jpg";
import axios from "axios";

const AddProperty = () => {
  const { token } = useContext(AuthContext);

  // Step state: 1 = Property Details, 2 = Owner Details
  const [step, setStep] = useState(1);

  // Centralized form state for both forms
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    country: "",
    state: "",
    city: "",
    bedrooms: 1,
    bathrooms: 1,
    images: [],
    type: "buy",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit handler for final submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors([]); // clear old errors

    try {
      const formData = new FormData();

      // Append all fields except images
      Object.keys(form).forEach((key) => {
        if (key !== "images") formData.append(key, form[key]);
      });

      // Append images
      form.images.forEach((img) => formData.append("images", img));

      await axios.post("https://hi-homie.onrender.com/api/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Property added successfully!");

      // Reset form ONLY on success
      setForm({
        title: "",
        description: "",
        price: "",
        address: "",
        country: "",
        state: "",
        city: "",
        bedrooms: 1,
        bathrooms: 1,
        images: [],
        type: "buy",
        ownerName: "",
        ownerEmail: "",
        ownerPhone: "",
      });

      setStep(1);

    } catch (err) {
      // VALIDATION ERRORS FROM BACKEND
      if (err.response?.status === 400 && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("Failed to add property");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className="w-full min-h-screen flex justify-center p-10 items-center"
      style={{ backgroundImage: `url(${House})` }}
    >
      <div className="bg-gray-900/5 backdrop-blur-md w-[90%] md:w-[80%] lg:w-[75%] p-8 rounded-xl shadow-2xl text-white ">
        {/* Step bars */}
        <div className="flex mb-6  gap-10">
          <div
            className={`flex-1 text-center py-2 font-bold rounded-full ${
              isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } ${
              step === 1 ? "bg-[#5C4033]" : "bg-gray-700/50"
            }`}
            onClick={() => !isSubmitting && setStep(1)}
          >
            Property Details
          </div>
          <div
            className={`flex-1 text-center py-2 font-bold rounded-full ${
              isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } ${
              step === 2 ? "bg-[#5C4033]" : "bg-gray-700/50"
            }`}
            onClick={() => !isSubmitting && setStep(2)}
          >
            Owner Details
          </div>
        </div>

        {/* Conditional rendering of forms */}
        {step === 1 && (
          <PropertyDetailsForm
            form={form}
            setForm={setForm}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <OwnerDetailsForm
            form={form}
            setForm={setForm}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}


        {/* ERROR BLOCK */}
        {errors.length > 0 && (
          <div className="mt-4">
            {errors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">
                {err}
              </p>
            ))}
          </div>
        )}

        {/*  SUBMIT BUTTON (ONLY ON STEP 2) */}
        {step === 2 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-[#5C4033] rounded hover:bg-[#3e2a21ff] transition-all duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding Property..." : "Create Listing"}
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default AddProperty;
