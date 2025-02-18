const Texticon = ({data}) => {
  return (
    <div className="flex w-full  gap-2">
      <div className="flex bg-white mt-[0.8rem] h-[3rem] w-[90%] ml-[1rem] text-2xl font-bold text-gray-600 items-center rounded-xl font-mdsans">
        {data}
      </div>
      <div className="flex justify-center items-center">
        
      </div>
    </div>
  );
};

export default Texticon;
