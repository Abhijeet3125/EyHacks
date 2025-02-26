import { FileUser, Headset } from 'lucide-react';
import React from 'react';
import ChatInput from '../components/ChatInput';
import ChatContainer from '../components/ChatContainer';

const AgentDash = () => {
  return (
    <div className="w-full flex ">
      {/* box layer */}
      <div className="flex flex-col w-[61%]">
        <div className="h-[25%] mt-[7rem] w-50% flex gap-5 pl-[9%] text-white">
          <div className="w-[23%] h-[12rem] bg-base-300 rounded-2xl opacity-70 flex flex-col">
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              Active Claims
            </div>
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              {' '}
              4
            </div>
          </div>
          <div className="w-[23%] h-[12rem] bg-base-300 rounded-xl opacity-70">
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              Calls made today
            </div>
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              {' '}
              4
            </div>
          </div>
          <div className="w-[23%] h-[12rem] bg-base-300 rounded-2xl opacity-70">
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              Customer satisfaction
            </div>
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              {' '}
              Mostly happy
            </div>
          </div>
          <div className="w-[23%] h-[12rem] bg-base-300 rounded-2xl opacity-70">
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              Pending Claims
            </div>
            <div className="flex flex-col items-center justify-center font-bold font-dmsans text-xl pt-[10%]">
              {' '}
              0
            </div>
          </div>
        </div>

        <div className="h-full w-full mt-[3rem] flex justify-between pl-[9%]">
          {/* current claim */}
          <div className="w-[47%] h-[33rem] bg-[rgba(0,0,0,0.7)] rounded-2xl ">
            <div className="font-dmsans font-bold ml-5 mt-2 mb-2 text-xl text-white">
              Current Claim
            </div>
            <div className="w-[95%] h-[87%] bg-[rgba(0,0,0,0.7)] ml-3 rounded-xl flex flex-col"></div>
          </div>

          {/* claims today*/}
          <div className="w-[47%] h-[33rem] bg-[rgba(0,0,0,0.6)] rounded-2xl">
            <div className="font-dmsans font-bold ml-5 mt-2 mb-2 text-xl text-white">
              Claims Today
            </div>
            <div className="w-[95%] h-[87%] bg-[rgba(0,0,0,0.6)] ml-3 rounded-xl flex flex-col"></div>
          </div>
        </div>
      </div>

      {/* chatbot */}
      <div className="w-[35%] ml-[2rem] mt-[7rem]">
        <div className="w-full h-full rounded-2xl bg-[rgba(0,0,0,0.6)] flex flex-col items-start justify-center text-white">
          <div className="font-dmsans font-bold ml-5 mb-1 text-xl">
            Ask SakshamAI
          </div>
          <div className="w-[96%] h-[91%] bg-[rgba(0,0,0,0.7)] ml-3 rounded-xl flex flex-col">
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
