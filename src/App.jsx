import Boxlayer from "./components/Molecules/Boxlayer";
import SideBar from "./components/Molecules/SideBar";
import TopBar from "./components/Molecules/TopBar";

const App = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ml-[6rem] max-w-screen overflow-hidden">
        <TopBar />
        <Boxlayer />
        {/* Add other components here */}
      </div>
    </div>
  );
};

export default App;