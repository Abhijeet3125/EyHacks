import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { React, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const AgentLogin = () => {
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    agentID: '',
    password: '',
  });

  const { login, isLoggingIn } = useAuthStore();
  const hanldeSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen font-dmsans">
      {/* <div className="mb-[1rem]">
        Enter your agent ID and password to create login.
      </div> */}
      <div className="bg-[rgba(0,0,0,0.7)] rounded-3xl h-[30rem] w-[30rem] flex flex-col shadow-xl items-center">
        <div className="text-3xl font-bold pt-[2rem] flex flex-col ">
          Welcome
        </div>
        <form
          onSubmit={hanldeSubmit}
          className="space-y-6 w-[90%] p-[2rem] m-auto mb-0 mt-0"
        >
          <label className="flex flex-col gap-2 ">
            Agent ID
            <input
              type="text"
              placeholder="Agent ID"
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] pl-2 border-none"
              value={formData.agentID}
              onChange={(e) =>
                setFormData({ ...formData, agentID: e.target.value })
              }
            />
          </label>
          <label className="flex flex-col gap-2">
            Password
            <input
              type="text"
              placeholder="••••••"
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] pl-2 border-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isLoggingIn}
          >
            Sign In
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Don't have an account?{' '}
            <Link to={'/signup'}>
              {' '}
              <span className="text-blue-400">create Account</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;
