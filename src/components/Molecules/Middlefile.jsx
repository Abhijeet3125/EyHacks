import { useState } from "react";
import axios from "axios";
import Texticon from "../Atoms/Texticon";
import PopCat from "../Atoms/PopCat";

const Middlefile = () => {
  const [responseData, setResponseData] = useState(""); // Store API response
  const [inputText, setInputText] = useState(""); // Store user input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to send text to backend and fetch response
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setResponseData("");

    try {
      const response = await axios.post(
        "http://localhost:5000/process_conversation",
        {
          conversation_text: inputText, // Send user input to backend
        }
      );

      setResponseData(response.data.response); // Store API response
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch response");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 rounded-xl w-[99.8%] gap-[0.8rem] h-[30rem] flex">
      <div className="bg-white w-[63%] rounded-xl h-[98%] ml-1 mt-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <Texticon data="Real Time Suggestions" />
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 hover:bg-blue-600 disabled:opacity-50 w-25"
            disabled={loading}
          >
            {loading ? "Processing..." : "Ask AI"}
          </button>
        </div>

        {/* Display API response */}
        <div className="p-4 rounded-lg bg-orange-50 w-full h-[80%] overflow-auto font-sans text-lg font-semibold">
          {error && (
            <p className="text-gray-600 typing-text font-mdsans">{error}</p>
          )}
          {!error && responseData && (
            <p className="typing text text-gray-800">{responseData}</p>
          )}
        </div>
      </div>

      <PopCat />
    </div>
  );
};

export default Middlefile;
