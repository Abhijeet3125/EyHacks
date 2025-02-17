import React from "react";

const Navbar = () => {
  return (
    <div className="border-b border-base-300 fixed w-full ">
      <div className="px-4 h-16 flex justify-items-stretch bg-gray-900">
        <div className="flex flex-row justify-between items-center w-full bg-gray-900">
          <div className="text-3xl font-bold text-white">SAKSHAM</div>
          <div>
            <button className="px-2 py-2 text-white rounded-2xl bg-orange-500">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
