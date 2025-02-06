import notifbell from "/public/notifbell.svg";

const TopBar = ({ notifs, name, title, profpic }) => {
  return (
    <div className="bg-red-500 h-[2rem] flex gap-[1rem]">
      <div className="flex items-center text-gray-600 bg-amber-400 text-sm font-bold h-[2rem] w-[60rem] pl-[0.5rem] ml-[3rem]">
        @ SAKSHAM-AI
      </div>

      {/* Notification Bell Container */}
      <div className="bg-amber-900 w-[3rem] relative flex items-center justify-center">
        <img className="w-[1.8rem] " src={notifbell} alt="" />

        {/* Green Notification Indicator */}
        <div className="bg-green-600 w-[0.5] h-[1rem] rounded-full absolute top-0 right-0 z-10 flex items-center justify-center text-xs text-white">
          {notifs}
        </div>
      </div>

      <div className="bg-yellow-700 text-center flex items-center justify-center w-[8rem]">
        <h6>{name}</h6>   
        <h5>{title}</h5>   
        
      </div>

      <div className="bg-red-100 rounded-t-full">meow {profpic}</div>
    </div>
  );
};

export default TopBar;
