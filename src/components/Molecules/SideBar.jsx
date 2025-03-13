const SideBar = () => {
  return (
    <div className="flex h-[68rem] w-[6rem] fixed top-0 left-0 z-50">
      <div className=" flex flex-col h-[80%] w-[95%] bg-white rounded-2xl mt-[3rem]">
        <div className="flex h-20 w-full items-center justify-center">
          <img src="/menu.png" alt="///" className="object-cover size-10" />
        </div>
        <div className="flex h-20 w-full items-center justify-center">
          <img src="/star.png" alt="*" className="object-cover size-10" />
        </div>
        <div className="flex h-20 w-full items-center justify-center">
          <img src="/google-docs.png" alt="*" className="object-cover size-10" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
