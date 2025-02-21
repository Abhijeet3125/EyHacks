import Navbar from "./components/Navbar";
import AgentHome from "./pages/AgentHome";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import StatusPage from "./pages/StatusPage";
import AgentSignup from "./pages/AgentSignup";
import AgentLogin from "./pages/AgentLogin";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        {/* <AgentHome /> */}
        {/* <HomePage/>
      <LoginPage/>
      <StatusPage /> */}
        {/* <AgentSignup /> */}
        <AgentLogin />
      </div>
    </div>
  );
};

export default App;
