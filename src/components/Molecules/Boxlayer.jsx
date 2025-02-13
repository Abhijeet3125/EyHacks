import Box from "../Atoms/Box"

const Boxlayer = () => {
  return (
    <div className="bg-red-500 gap-[7rem] w-full h-auto justify-center flex flex-row ml-[0.1rem] mt-[0.2rem]">
      <Box divname="meow" color="bg-gray-900" />
      <Box divname="meow" color="bg-gray-900" />
      <Box divname="meow" color="bg-gray-900" />
      <Box divname="meow" color="bg-gray-900" />
    </div>
  )
}

export default Boxlayer
