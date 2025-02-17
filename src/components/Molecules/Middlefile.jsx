import PopCat from "../Atoms/PopCat";
import Texticon from "../Atoms/Texticon";

const Middlefile = () => {
  return (
    <div className="p-4 rounded-xl w-[99.8%] gap-[0.8rem] h-[30rem] flex">
      <div className="bg-white w-[63%] rounded-xl h-[98%] ml-[0.2rem] mt-[0.3rem] flex-row gap-[2rem]">
        <Texticon />
        <div className="ml-[1.2rem] flex items-center justify-center w-[96.5%] h-[84%]">
          <div className="p-[1rem] rounded-xl bg-orange-50 w-full h-full overflow-auto">
            
          </div>
        </div>
      </div>
      <PopCat />
    </div>
  );
};

export default Middlefile;
