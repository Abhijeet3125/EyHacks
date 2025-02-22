import { FileUser, Headset, House } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-17 bg-base-300 flex flex-col justify-start items-center pt-[7rem]">
      <button className="btn size-15 mb-[1rem] hover:bg-green-800">
        <Headset />
      </button>
      <button className="btn size-15 mb-[1rem] hover:bg-green-800">
        <FileUser />
      </button>
      <button className="btn size-15 mb-[1rem] hover:bg-green-800">
        <House />
      </button>
    </div>
  );
};

export default Sidebar;
