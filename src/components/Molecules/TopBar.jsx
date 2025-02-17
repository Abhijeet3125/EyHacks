import notifbell from "/public/notifbell.svg";

const TopBar = ({ notifs, name, title, profpic }) => {
  return (
    <div className="bg-white max-w-screen h-[4rem] flex gap-[1rem] z-10 ml-[6.1rem]">
      <div className="flex items-center text-gray-600 bg-white text-2xl font-bold h-[4rem] w-[95rem] pl-[1rem] ml-[0rem] font-sans">
        SAKSHAM-AI
      </div>

      {/* Notification Bell Container */}
      <div className="bg-white w-[3rem] relative flex items-center justify-center">
        <img className="w-[1.8rem]" src={notifbell} alt="" />
        <div className="bg-green-600 w-[0.6rem] h-[0.7rem] rounded-full absolute top-5 right-4 z-10 flex items-center justify-center text-xs text-black">
          {notifs}
        </div>
      </div>

      <div className="bg-white text-center flex flex-row items-center justify-center w-[8rem]">
        <div className="bg-white w-[4rem] rounded-t-full size-15 flex justify-center items-center">
          {/* <h6>{name} meow</h6> */}
          <img src="/hang-up.png" alt="user" className="object-cover size-7" />
        </div>
        <div className="bg-white w-[4rem] rounded-t-full size-15 flex justify-center items-center">
          {/* <h5>{title} meow2</h5> */}
          <img src="/upload.png" alt="user" className="object-cover size-7" />
        </div>
      </div>

      <div className="bg-white w-[4rem] rounded-t-full size-15 flex justify-center items-center">
        <img src="/user.png" alt="user" className="object-cover size-10" />
      </div>
    </div>
  );
};

export default TopBar;
