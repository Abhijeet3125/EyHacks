import { Eye, EyeOff, Loader2 } from "lucide-react";
import { React, useState } from "react";

const AgentSignup = () => {
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const hanldeSubmit = () => {};

  return (
    <div className="flex flex-col justify-center items-center h-screen font-mdsans">
      <div className="text-3xl font-bold mb-[1.5rem] flex flex-col">
        Create Account
      </div>
      {/* <div className="mb-[1rem]">
        Enter your agent details to create account.
      </div> */}
      <div className="bg-base-300 rounded-3xl h-[33rem] w-[30rem] flex flex-col backdrop-blur-lg shadow-lg">
        <form
          onSubmit={hanldeSubmit}
          className="space-y-6 w-[90%] p-[2rem] m-auto mb-0 mt-0"
        >
          <label className="flex flex-col gap-2 pt-[1rem]">
            Full Name
            <input
              type="text"
              placeholder="Full Name"
              className="h-13 rounded-md bg-base-100 pl-2 border-none"
            />
          </label>
          <label className="flex flex-col gap-2 ">
            Agent ID
            <input
              type="text"
              placeholder="Agent ID"
              className="h-13 rounded-md  bg-base-100 border-none pl-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            Password
            <input
              type="text"
              placeholder="••••••"
              className="h-13 rounded-md bg-base-100 border-none pl-2"
            />
          </label>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <span className="text-blue-400">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentSignup;
