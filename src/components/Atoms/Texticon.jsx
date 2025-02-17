const Texticon = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="flex bg-white mt-[0.8rem] h-[3rem] w-[90%] ml-[1rem] text-2xl font-bold text-gray-600 items-center rounded-xl">
        Live Suggestions
      </div>
      <div className="flex justify-center items-center">
        <button className="px-3 py-2 bg-violet-600 rounded-2xl m-1 text-white">
          Ask AI
        </button>
      </div>
    </div>
  );
};

export default Texticon;
