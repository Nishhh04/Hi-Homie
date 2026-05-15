import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UnderDeal = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen w-full bg-[#f6f3ef] px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-3xl font-semibold text-[#5a3e2b] mb-4">
          Properties Under Deal
        </h1>
        <p className="text-gray-600">
          Properties currently under negotiation will appear here.
        </p>

        {/* Later: show deal status cards */}
      </div>
    </div>
  );
};

export default UnderDeal;
