import jwt from "jsonwebtoken";
import Agent from "../models/agent.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Token:", token); // Log the token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Log the decoded token

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const agent = await Agent.findById(decoded.agentId).select("-password");
        console.log("Agent:", agent); // Log the agent

        if (!agent) {
            return res.status(404).json({ message: "User not found" });
        }

        req.agent = agent;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message); // Log the error
        res.status(500).json({ message: "Internal server error" });
    }
};