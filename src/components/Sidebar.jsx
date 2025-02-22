import { FileUser, Headset } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-17 bg-base-300 flex flex-col justify-center items-center">
      <button className="btn size-15 mb-[1rem]">
        <Headset />
      </button>
      <button className="btn size-15">
        <FileUser />
      </button>
    </div>
  );
};

export default Sidebar;
