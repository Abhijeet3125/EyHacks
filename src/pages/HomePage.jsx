import { React, useState } from "react";
const HomePage = () => {
  const [files, setFiles] = useState({
    doc1: null,
    doc2: null,
    description: "",
  });

  const handleFileChange = (event, field) => {
    setFiles((prev) => ({ ...prev, [field]: event.target.files[0] }));
  };

  const handleDescriptionChange = (event) => {
    setFiles((prev) => ({ ...prev, description: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Uploaded Files:", files);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-row container w-full max-w-7xl justify-between">
        <div className="w-200 h-125 rounded-3xl flex items-center justify-center bg-gray-800">
          <form className="w-full p-5 h-full" onSubmit={handleSubmit}>
            <h2 className="text-white text-2xl font-semibold mb-4">
              Upload Your Claim Documents
            </h2>

            {/* Document 1 */}
            <label className="block text-gray-400 mb-1">Document 1</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "doc1")}
              className="w-full p-3 bg-black text-white rounded-lg mb-3 focus:outline-none"
            />

            {/* Document 2 */}
            <label className="block text-gray-400 mb-1">Document 2</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "doc2")}
              className="w-full p-3 bg-black text-white rounded-lg mb-3 focus:outline-none"
            />

            {/* Description */}
            <label className="block text-gray-400 mb-1">Description</label>
            <textarea
              rows="4"
              value={files.description}
              onChange={handleDescriptionChange}
              className="w-full p-3 bg-black text-white rounded-lg focus:outline-none"
              placeholder="Enter description..."
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 mt-4 rounded-full hover:bg-orange-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="bg-gray-500 w-100 h-150 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default HomePage;
