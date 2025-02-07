const Box = ({divname, numbers, icon, subNumbers, color}) => {
  return (
    <div className={`flex w-[22rem] ml-[0rem] mt-[1rem] mb-[1rem] ${color} rounded-2xl h-[11rem]`}>
        <div className=" w-[16rem] rounded-l-xl bg-amber-500 flex flex-col">
            <div className="w-[10rem] h-[2rem] rounded-xl  mt-[1.5rem] text-white ml-[0.6rem] ">
                {divname}
            </div>

            <div className="w-[10rem] text-white h-[2.6rem] rounded-xl mt-[0.8rem] ml-[0.6rem] ">
                <h5>meow {numbers}</h5>
                <h5 className="text-xs text-white">meow3 {subNumbers}</h5>
            </div>
        </div>

        <div className="w-[6rem] bg-red-700 text-white pt-[2rem] pl-[0.4rem] rounded-r-xl">
           <img src={icon} alt="meow" />
        </div>
    </div>
  )
}

export default Box