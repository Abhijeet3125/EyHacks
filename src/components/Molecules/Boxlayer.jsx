import Box from "../Atoms/Box";
import { useState } from "react";

const Boxlayer = () => {

    const [claimId, setClaimId] = useState("");
    const [amount, setAmount] = useState("");
    const [dateTime, setDateTime] = useState("");
  
  return (
    <div className="w-[60rem] ml-[1rem] mt-[1rem] rounded-2xl">
      {/* <Box divname="meow" color="bg-gray-900" />
      <Box divname="meow" color="bg-gray-900" />
      <Box divname="meow" color="bg-gray-900" />
      <Box divname="meow" color="bg-gray-900" /> */}

      <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Claim Details</h2>
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Claim ID"
          value={claimId}
          onChange={(e) => setClaimId(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    </div>
  );
};

export default Boxlayer;
