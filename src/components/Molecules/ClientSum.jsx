import Texticon from "../Atoms/Texticon";

const ClientSum = () => {
  return (
    <div className="flex justify-start items-center w-[99.7%] h-[20rem]">
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl w-full h-full m-20">
        <Texticon data="Client Summary"/>
        <div className="w-[97%] h-full m-[1rem] rounded-2xl bg-blue-100"></div>
      </div>
    </div>
  );
};

export default ClientSum;
