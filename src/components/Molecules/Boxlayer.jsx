import Box from "../Atoms/Box";
import { useState } from "react";

const Boxlayer = ({ claimId, amount, dateTime }) => {
  return (
    <div className="w-[60rem] ml-[1rem] mt-[1rem] rounded-2xl">
      <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-lg font-bold font-mdsans mb-3">Claim Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Claim ID"
            value={claimId}
            readOnly
            className="p-2 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            readOnly
            className="p-2 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
          <input
            type="datetime-local"
            value={dateTime}
            readOnly
            className="p-2 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default Boxlayer;
