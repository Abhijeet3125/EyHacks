import { Bell, Cog, LogOut } from "lucide-react";
import React from "react";
import notifbell from "/public/notifbell.svg";

const Navbar = ({ notifs, profilePic }) => {
  return (
    <div className=" absolute w-full bg-base-300 z-1">
      <div className="px-[4rem] h-16 flex justify-items-stretch bg-base-300">
        <div className="flex flex-row justify-between items-center w-full bg-base-300">
          <div className="text-3xl font-bold font-dmsans pl-[3rem]">
            SakshamAI
          </div>
          <div className="flex">
            <button className="btn btn-neutral mr-[1rem] flex items-center group">
              <Bell />
            </button>
            <button className="btn btn-neutral mr-[1rem] flex items-center group">
              <Cog />
              <span className="inline-flex w-0 opacity-0 overflow-hidden transition-all duration-1000 ease-in-out group-hover:w-auto group-hover:opacity-100">
                Settings
              </span>
            </button>

            <button className="btn btn-neutral mr-[1rem] flex items-center group">
              <LogOut />
              <span className="inline-flex w-0 opacity-0 overflow-hidden transition-all duration-1000 ease-in-out group-hover:w-auto group-hover:opacity-100">
                Logout
              </span>
            </button>
            <div className="size-10 rounded-full bg-amber-300 bg-cover"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
