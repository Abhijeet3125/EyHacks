import { FileUser, Headset } from "lucide-react";
import { React, useEffect } from "react";
import ChatInput from "../components/ChatInput";
import ChatContainer from "../components/ChatContainer";
import { useStore } from "../store/useStore";
import { useAuthStore } from "../store/useAuthStore";
import GlowEffect from "../components/GlowEffect";

const AgentDash = () => {
  const { authAgent } = useAuthStore();
  const { fetchClaims, claims } = useStore();

  useEffect(() => {
    if (authAgent && authAgent.agentID) {
      fetchClaims(authAgent.agentID);
    }
  }, [authAgent, fetchClaims]);

  return (
    <div className="w-full flex ">
      {/* box layer */}
      <div className="flex flex-col w-[61%]">
        <div className="h-[25%] mt-[7rem] w-50% flex gap-5 pl-[9%]">
          <div className="w-[23%] h-[12rem] bg-[rgba(0,0,0,0.5)] rounded-2xl flex flex-col">
            <div className="flex flex-col items-center justify-center font-medium font-dmsans text-lg pt-[10%] w-full p-[1rem] bg-[rgba(0,0,0,0.7)] rounded-t-2xl">
              Active Claims
            </div>
            <div className="flex flex-col items-center justify-center font-extrabold font-dmsans text-6xl pt-[10%] text-green-500">
              {" "}
              {claims.length}
            </div>
          </div>
          <div className="w-[23%] h-[12rem] bg-[rgba(0,0,0,0.5)] rounded-2xl flex flex-col">
            <div className="flex flex-col items-center justify-center font-medium font-dmsans text-lg pt-[10%] w-full p-[1rem] bg-[rgba(0,0,0,0.7)] rounded-t-2xl">
              Calls made today
            </div>
            <div className="flex flex-col items-center justify-center font-extrabold font-dmsans text-6xl pt-[10%] text-yellow-500">
              {" "}
              4
            </div>
          </div>
          <div className="w-[23%] h-[12rem] bg-[rgba(0,0,0,0.5)] rounded-2xl flex flex-col">
            <div className="flex flex-col items-center justify-center font-medium font-dmsans text-lg pt-[10%] w-full p-[1rem] bg-[rgba(0,0,0,0.7)] rounded-t-2xl">
              Customer satisfaction
            </div>
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-2xl pt-[10%] text-green-500">
              {" "}
              Mostly happy
            </div>
          </div>
          <div className="w-[23%] h-[12rem] bg-[rgba(0,0,0,0.5)] rounded-2xl flex flex-col">
            <div className="flex flex-col items-center justify-center font-medium font-dmsans text-lg pt-[10%] w-full p-[1rem] bg-[rgba(0,0,0,0.7)] rounded-t-2xl">
              Pending Claims
            </div>
            <div className="flex flex-col items-center justify-center font-extrabold font-dmsans text-6xl pt-[10%] text-red-500">
              {" "}
              3
            </div>
          </div>
        </div>

        <div className="h-full w-full mt-[3rem] flex justify-between pl-[9%]">
          {/* current claim */}
          <div className="w-[47%] h-[33rem] bg-[rgba(0,0,0,0.5)] rounded-2xl ">
            <div className="font-dmsans font-bold ml-5 mt-2 mb-2 text-xl text-white">
              Customer Feedback
            </div>
            <div className="w-[95%] h-[87%] bg-[rgba(0,0,0,0.4)] ml-3 rounded-xl flex flex-col">
              <div className="w-[97%] h-[4rem] bg-green-200 p-1 m-2 rounded-lg flex flex-col">
                <h3 className="font-bold text-black ">Shubh Shreshth</h3>
              </div>
              <div className="w-[97%] h-[4rem] bg-green-200 p-1 m-2 rounded-lg flex flex-col">
                <h3 className="font-bold text-black ">Kartev Sumit</h3>
              </div>
            </div>
          </div>

          {/* claims today*/}
          <div className="w-[47%] h-[33rem] bg-[rgba(0,0,0,0.6)] rounded-2xl">
            <div className="font-dmsans font-bold ml-5 mt-2 mb-2 text-xl text-white">
              Claims Today
            </div>
            <div className="w-[95%] h-[87%] bg-[rgba(0,0,0,0.3)] ml-3 rounded-xl flex flex-col overflow-y-auto">
              {claims.map((claim) => (
                <div
                  key={claim.claimID}
                  className="w-95% h-26 bg-[rgba(0,0,0,0.5)] p-3 m-2 rounded-xl"
                >
                  <h3 className="mb-1">
                    <span className="p-0.5 bg-green-500 text-black rounded-sm font-semibold mr-1">
                      Claim ID :
                    </span>
                    {claim.claimID}
                  </h3>
                  <p className="mb-1">
                    <span className="p-0.5  font-medium mr-1 text-white">
                      Client Name :
                    </span>{" "}
                    {claim.clientName}
                  </p>
                  <p className="mb-1">
                    <span className="p-0.5  font-medium mr-1 text-white">
                      Claim Type :
                    </span>
                    {claim.claimType}
                  </p>
                  {/* <a href={`/upload/${claim.claimID}`}>Upload Documents</a> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* chatbot */}
      <div className="w-[35%] ml-[2rem] mt-[7rem]">
        <div className="w-full h-full rounded-2xl bg-[rgba(0,0,0,0.8)] flex flex-col items-start justify-center text-white">
          {/* <div className="font-dmsans font-bold ml-5 mb-2 text-xl py-1 px-2 rounded-xl bg-gradient-to-r from-blue-900 to-green-900 [text-shadow:_2px_2px_0_rgb(0_0_0)]">
            Ask Saksham AI
          </div> */}
          <div className="pl-[1rem] pb-[0.5rem] text-2xl font-extrabold font-dmsans bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Ask Saksham AI
          </div>
          <div className="w-[96%] h-[91%] bg-[rgba(0,0,0,0.6)] ml-3 rounded-xl flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <ChatContainer />
            </div>
            {/* <ChatInput /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDash;
