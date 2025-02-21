import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import agentAuthRoutes from "./routes/agentAuth.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", agentAuthRoutes);

app.get('/', (req, res) => {
    res.send("backend is running");

});

app.listen(PORT, () => {
    console.log(`server is running of port ${PORT}`);
    connectDB();
});
