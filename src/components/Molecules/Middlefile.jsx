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
      const response = await axios.post("http://localhost:5000/process_conversation", {
        conversation_text: inputText,  // Send user input to backend
      });

      setResponseData(response.data.response); // Store API response
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch response");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 rounded-xl w-[99.8%] gap-[0.8rem] h-[30rem] flex">
      <div className="bg-white w-[63%] rounded-xl h-[98%] ml-[0.2rem] mt-[0.3rem] flex-row gap-[2rem]">
      <Texticon data="Real Time Suggestions" />
        
        {/* Input and Button */}
        <div className="ml-[1.2rem] flex flex-col items-center justify-center w-[96.5%] h-[84%]">
          {/* <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Enter conversation text..."
          /> */}
          <button 
            onClick={fetchData}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : "Ask AI"}
          </button>

          {/* Display API response */}
          <div className="p-[1rem] rounded-xl bg-orange-50 w-full h-full overflow-auto mt-4">
            {error && <p className="text-red-500">{error}</p>}
            {!error && responseData && <p>{responseData}</p>}
          </div>
        </div>
      </div>
        
      <PopCat />
    </div>
  );
};

export default Middlefile;
