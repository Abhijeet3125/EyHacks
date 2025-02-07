import notifbell from "/public/notifbell.svg";

const TopBar = ({ notifs, name, title, profpic }) => {
  return (
    <div className="bg-red-500 max-w-screen h-[4rem] flex gap-[1rem] z-10 ml-[0.1rem]">
      <div className="flex items-center text-gray-600 bg-amber-400 text-sm font-bold h-[4rem] w-[95rem] pl-[0.5rem] ml-[0rem] ">
        @ SAKSHAM-AI
      </div>

      {/* Notification Bell Container */}
      <div className="bg-amber-900 w-[3rem] relative flex items-center justify-center">
        <img className="w-[1.8rem]" src={notifbell} alt="" />
        <div className="bg-green-600 w-[0.5rem] h-[1rem] rounded-full absolute top-0 right-0 z-10 flex items-center justify-center text-xs text-white">
          {notifs}
        </div>
      </div>

      <div className="bg-yellow-700 text-center flex flex-col items-center justify-center w-[8rem]">
        <div>
          <h6>{name} meow</h6>
        </div>
        <div>
          <h5>{title} meow2</h5>
        </div>
      </div>

      <div className="bg-red-100 w-[4rem] rounded-t-full">
        <img src={profpic} alt="" />
      </div>
    </div>
  );
};

export default TopBar;
