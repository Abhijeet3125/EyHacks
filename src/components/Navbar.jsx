import { Cog } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b border-base-300 fixed w-full font-mdsans ">
      <div className="px-4 h-16 flex justify-items-stretch bg-base-100">
        <div className="flex flex-row justify-between items-center w-full bg-base-100">
          <div className="text-3xl font-bold">SAKSHAM-AI</div>
          <div>
            <button className="btn">
              <Cog />
              settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
