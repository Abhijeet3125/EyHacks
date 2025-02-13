import Boxlayer from "./components/Molecules/Boxlayer";
import ClientSum from "./components/Molecules/ClientSum";
import Middlefile from "./components/Molecules/Middlefile";
import SideBar from "./components/Molecules/SideBar";
import TopBar from "./components/Molecules/TopBar";

const App = () => {
  return (
    <div className="flex flex-col">
      <SideBar />
      <TopBar />
      <div className="flex-1 ml-[6rem] max-w-screen overflow-hidden">
        <Boxlayer />
        <Middlefile/>
        <ClientSum/>
      </div>
    </div>
  );
};

export default App;