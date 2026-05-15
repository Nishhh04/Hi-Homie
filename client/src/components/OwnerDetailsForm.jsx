const OwnerDetailsForm = ({ form, setForm, onBack, onSubmit }) => {

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">Owner Details</h2>

      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Name : <span className="text-red-600">*</span>
        </label>
        <input
          name="ownerName"
          value={form.ownerName || ""}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Email : <span className="text-red-600">*</span> 
        </label>
        <input
          type="email"
          name="ownerEmail"
          value={form.ownerEmail || ""}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      <div className="mb-4 flex items-center gap-4">
        <label className="w-32 text-bg font-medium text-left text-black">
          Phone : <span className="text-red-600">*</span>
        </label>
        <input
          name="ownerPhone"
          value={form.ownerPhone || ""}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-md bg-gray-100/30 text-black focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Back
        </button>

        
      </div>
    </form>
  );
};

export default OwnerDetailsForm;
