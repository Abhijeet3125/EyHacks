import agent from "../models/agent.model.js"
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import Agent from "../models/agent.model.js";

export const signup = async (req , res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All  fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const agent = await agent.findOne({ email });
        if (agent) {
            return res.status(400).json({ message: "agent already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);

        const newAgent = new agent({
            fullName: fullName,
            email: email,
            password: hashedpass
        });

        if (newAgent) {
            await newAgent.save();
            generateToken(newAgent._id, res);

            res.status(201).json({
                _id: newAgent._id,
                fullName: newAgent.fullName,
                email: newAgent.email,
                profilePic: newAgent.profilePic
            });
        } else {
            res.status(400).json({ message: "Invalid agent data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const agent = await Agent.findOne({ email });

        if (!agent) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPassCorrect = await bcrypt.compare(password, agent.password);
        if (!isPassCorrect) {
            return res.status(400).json({ message: "Invalid creadentials" });
        }

        generateToken(agent._id, res); // resend the cookie 

        res.status(200).json({
            _id: agent._id,
            fullName: agent.fullName,
            email: agent.email,
            profilePic: agent.profilePic

        });
    } catch (error) {
        console.log("error in login controller", error.message);
        return res.status(500).json({ message: "internal server error" });
    }
};