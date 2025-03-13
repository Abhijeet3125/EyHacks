import { React, useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-200 h-100 rounded-2xl bg-gray-800 flex flex-col">
        <div className="text-gray-300 text-2xl font-bold px-5 py-10">
          Welcome to SAKSHAM
        </div>
        <div className="text-gray-300 text-xl px-5">
          Enter your unique ID to proceed with the claim processing.
          <form onSubmit={handleSubmit} className="w-full my-10">
            <input
              type="text"
              placeholder="Enter unique ID"
              className="w-full bg-gray-700 p-4 rounded-2xl m-auto"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 mt-4 rounded-full hover:bg-orange-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
