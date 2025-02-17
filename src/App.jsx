import Boxlayer from "./components/Molecules/Boxlayer";
import ClientSum from "./components/Molecules/ClientSum";
import Middlefile from "./components/Molecules/Middlefile";
import SideBar from "./components/Molecules/SideBar";
import TopBar from "./components/Molecules/TopBar";
import Navbar from "./components/Navbar";
import AgentHome from "./pages/AgentHome";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import StatusPage from "./pages/StatusPage";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <AgentHome />
      {/* <HomePage/>
      <LoginPage/>
      <StatusPage /> */}
    </div>
  );
};

export default App;
