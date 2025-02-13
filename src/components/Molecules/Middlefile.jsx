import PopCat from "../Atoms/PopCat"
import Texticon from "../Atoms/Texticon"

const Middlefile = () => {
  return (
    <div className="bg-red-500 rounded-xl mt-[0.2rem] w-[99.8%] ml-[0.1rem] gap-[0.8rem] h-[30rem] flex">
      
      <div className="bg-amber-300 w-[63%] rounded-xl h-[98%] ml-[0.2rem] mt-[0.3rem] flex-row gap-[2rem]">
          <Texticon/>
          <div className="mt-[0.6rem] w-[96.5%] rounded-xl h-[84%] ml-[0.9rem] bg-red-950 ">
           clasmate 
          </div>       
      </div>
      <PopCat/>
    </div>
  )
}

export default Middlefile
