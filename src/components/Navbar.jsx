import { Bell, Cog, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = ({ notifs, profilePic }) => {
  const { logout, authAgent } = useAuthStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Sample notifications data
  const notifications = [
    { id: 1, message: "New claim assigned to you." },
    { id: 2, message: "Reminder: Follow up on claim #123." },
  ];

  return (
    <div className="absolute w-full bg-base-300 z-1">
      <div className="px-[4rem] h-16 flex justify-items-stretch bg-base-300">
        <div className="flex flex-row justify-between items-center w-full bg-base-300">
          <div className="text-4xl font-extrabold font-dmsans bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Saksham AI
          </div>
          {/* <div className="text-3xl font-bold font-dmsans py-1 px-2 rounded-xl bg-gradient-to-r from-blue-900 to-green-900 [text-shadow:_2px_2px_0_rgb(0_0_0)] border-2 border-black ml-[2rem] text-white"></div> */}
          <div className="flex">
            {authAgent && (
              <div
                className="relative"
                onMouseEnter={() => setIsNotificationsOpen(true)}
                onMouseLeave={() => setIsNotificationsOpen(false)}
              >
                <button className="btn btn-neutral mr-[1rem] flex items-center group">
                  <Bell />
                </button>

                {/* Notification Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute left-7 mt-2 w-[20rem] bg-[rgba(0,0,0,0.7)] rounded-xl shadow-lg border border-gray-200 transform -translate-x-1/2">
                    <div className="p-4">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <p className="text-sm text-white">
                              {notif.message}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No notifications
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button className="btn btn-neutral flex items-center group bg-transparent border-0">
              <Cog />
              <span className="inline-flex max-w-0 opacity-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:max-w-full group-hover:opacity-100">
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
                  <span className="inline-flex max-w-0 opacity-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:max-w-full group-hover:opacity-100">
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
