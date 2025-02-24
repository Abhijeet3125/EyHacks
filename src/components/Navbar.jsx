import { Bell, Cog, LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = ({ notifs, profilePic }) => {
  const { logout, authAgent } = useAuthStore();

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
            <button className="btn btn-neutral mr-[1rem] flex items-center group bg-transparent border-0">
              <Cog />
              <span className="inline-flex max-w-0 opacity-0 overflow-hidden transition-all duration-600 ease-in-out group-hover:max-w-full group-hover:opacity-100">
                Settings
              </span>
            </button>

            {authAgent && (
              <>
                <button
                  className="btn btn-neutral mr-[1rem] flex items-center group bg-transparent border-0"
                  onClick={logout}
                >
                  <LogOut />
                  <span className="inline-flex max-w-0 opacity-0 overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-full group-hover:opacity-100">
                    Logout
                  </span>
                </button>
                <div className="size-10 rounded-full bg-amber-300 bg-cover"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
