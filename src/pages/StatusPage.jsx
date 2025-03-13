import { React, useState, useEffect } from "react";

const StatusPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const status = {
      documentSubmission: true,
      initialReview: "inProgress",
      decisionMaking: "pending",
    };

    if (status.documentSubmission) setProgress(33);
    if (status.initialReview === "inProgress") setProgress(66);
    if (status.decisionMaking === "completed") setProgress(100);
  }, [progress]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-row container w-full max-w-8xl justify-between">
        <div className="w-250 p-6 bg-gray-800 text-white rounded-3xl flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Claim Status Overview</h3>

          <div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex flex-col py-6">
            <h2>Step 1: Document Submission</h2>
            <p className="text-gray-400">
              {progress === 33 ? "completed" : "pending"}
            </p>
          </div>
          <div className="flex flex-col py-6">
            <h2>Step 2: Intitial Review</h2>
            <p className="text-gray-400">
              {progress === 66 ? "completed" : "pending"}
            </p>
          </div>
          <div className="flex flex-col py-6">
            <h2>Step 3: Decision making</h2>
            <p className="text-gray-400">
              {progress === 100 ? "completed" : "pending"}
            </p>
          </div>
        </div>
        <div className="w-120 h-170 bg-gray-800 rounded-3xl"></div>
      </div>
    </div>
  );
};

export default StatusPage;
