import jwt from "jsonwebtoken";
import Agent from "../models/agent.model.js";

export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "unauthorised - no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) { 
            return res.status(401).json({ message: "unauthorised - Invalid token" });
        }

        const agent = await Agent.findById(decoded.agentId).select("-password");

        if (!agent) {
            return res.status(404).json({ message: "user not found" });
        }

        req.agent = agent;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error);
        res.status(500).json({ message: "internal server error" });
    }
};