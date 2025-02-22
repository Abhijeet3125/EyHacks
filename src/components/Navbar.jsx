import { Cog, LogOut } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className=" absolute w-full bg-base-300 z-1">
      <div className="px-[4rem] h-16 flex justify-items-stretch bg-base-300">
        <div className="flex flex-row justify-between items-center w-full bg-base-300">
          <div className="text-3xl font-bold font-dmsans">SakshamAI</div>
          <div className="flex">
            <button className="btn btn-neutral mr-[1rem] flex items-center space-x-2 group">
              <Cog />
              <span className="inline-flex w-0 opacity-0 overflow-hidden transition-all duration-1000 ease-in-out group-hover:w-auto group-hover:opacity-100">
                Settings
              </span>
            </button>

            <button className="btn btn-neutral mr-[1rem] flex items-center space-x-2 group">
              <LogOut />
              <span className="inline-flex w-0 opacity-0 overflow-hidden transition-all duration-1000 ease-in-out group-hover:w-auto group-hover:opacity-100">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
