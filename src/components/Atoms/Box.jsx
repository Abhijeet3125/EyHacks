const Box = ({ divname, numbers, icon, subNumbers, color }) => {
  return (
    <div
      className={`flex w-[22rem] ml-[0rem] mt-[1rem] mb-[1rem] ${color} rounded-2xl h-[11rem]`}
    >
      <div className=" w-[16rem] rounded-l-xl bg-white flex flex-col">
        <div className="w-[10rem] h-[2rem] rounded-xl  mt-[1.5rem] text-black ml-[0.6rem] ">
          {divname}
        </div>

        <div className="w-[10rem] text-black h-[2.6rem] rounded-xl mt-[0.8rem] ml-[0.6rem] ">
          <h5>meow {numbers}</h5>
          <h5 className="text-xs text-black">meow3 {subNumbers}</h5>
        </div>
      </div>

      <div className="w-[6rem] bg-gradient-to-r from-purple-100 to-white text-black pt-[2rem] pl-[0.4rem] rounded-r-xl">
        <img src={icon} alt="meow" />
      </div>
    </div>
  );
};

export default Box;
