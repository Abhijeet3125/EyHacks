const Box = ({divname, numbers, icon, subNumbers, color}) => {
  return (
    <div className={`flex w-[15rem] ml-[5rem] mt-[1rem] ${color} rounded-2xl h-[8rem]`}>
        <div className=" w-[11rem] rounded-l-xl flex flex-col">
            <div className="w-[10rem] h-[2rem] rounded-xl  mt-[1.5rem] text-white ml-[0.6rem] ">
                {divname}
            </div>

            <div className="w-[10rem] text-white h-[2.6rem] rounded-xl mt-[0.8rem] ml-[0.6rem] ">
                <h5>meow {numbers}</h5>
                <h5 className="text-xs text-white">meow3 {subNumbers}</h5>
            </div>
        </div>

        <div className="w-[4rem] text-white pt-[2rem] pl-[0.4rem] rounded-r-xl">
           <img src={icon} alt="meow" />
        </div>
    </div>
  )
}

export default Box