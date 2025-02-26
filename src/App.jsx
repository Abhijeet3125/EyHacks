import Navbar from './components/Navbar';
import AgentHome from './pages/AgentHome';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StatusPage from './pages/StatusPage';
import AgentSignup from './pages/AgentSignup';
import AgentLogin from './pages/AgentLogin';
import AgentDash from './pages/AgentDash';
import Sidebar from './components/Sidebar';
import RealTsuggestion from './pages/RealTsuggestion';

const App = () => {
  return (
    <div className="bg-[url('/backimg4.jpg')] bg-cover">
      <Navbar />
      <Sidebar />
      <div className="w-full h-screen">
        <AgentDash />
        {/* <AgentSignup /> */}
        {/* <AgentLogin /> */}
        {/* <RealTsuggestion /> */}
      </div>

      {/* <AgentHome /> */}
      {/* <HomePage/>
        <LoginPage/>
        <StatusPage /> */}
    </div>
  );
};

export default App;
