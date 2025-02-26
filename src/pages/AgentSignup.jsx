import { Eye, EyeOff, Loader2 } from "lucide-react";
import { React, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AgentSignup = () => {
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    agentID: "",
    password: "",
  });

  const { signUp, isSigningup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.agentID.trim()) return toast.error("email is required");
    if (!formData.password) return toast.error("password is required");
    if (formData.password.length < 6)
      return toast.error("password must be atleast 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signUp(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen font-dmsans">
      {/* <div className="mb-[1rem]">
        Enter your agent details to create account.
      </div> */}
      <div className="bg-[rgba(0,0,0,0.7)] rounded-3xl h-[35rem] w-[30rem] flex flex-col shadow-xl items-center">
        <div className="text-3xl font-bold pt-[2rem] flex flex-col ">
          Create Account
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-[90%] p-[2rem] pt-[0.5rem] m-auto mb-0 mt-0"
        >
          <label className="flex flex-col gap-2 pt-[1rem]">
            Full Name
            <input
              type="text"
              placeholder="Full Name"
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] pl-2 border-none"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </label>
          <label className="flex flex-col gap-2 ">
            Agent ID
            <input
              type="text"
              placeholder="Agent ID"
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] border-none pl-2"
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
              className="h-13 rounded-md bg-[rgb(0,0,0,0.8)] border-none pl-2"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-blue-400">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentSignup;
