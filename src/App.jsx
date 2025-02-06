import Box from "./components/Box"
import SideBar from "./components/SideBar"
import TopBar from "./components/TopBar"
const App = () => {
  return (
    <>
     <TopBar/>
     <SideBar/>
     <Box divname="meow" />
    </>
  )
}

export default App
