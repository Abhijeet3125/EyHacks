import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import agentAuthRoutes from "./routes/agentAuth.routes.js";
import { connectDB } from "./lib/db.js";
import claimRoutes from "./routes/claimRoutes.js"
import documentRoutes from "./routes/documentRoutes.js"
import cookieParser from "cookie-parser";
import cron from "node-cron"
import { spawn } from 'child_process';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", agentAuthRoutes);
app.use('/api/claims', claimRoutes);
// app.use('/api/agents', agentRoutes);
app.use('/api/documents', documentRoutes);

// Schedule the /assign endpoint to run every 5 minutes
cron.schedule('*/1 * * * *', () => {
    console.log('Running claim assignment job...');
    axios.post(`http://localhost:${PORT}/api/claims/assign`)
        .then(response => console.log('Claims assigned:', response.data))
        .catch(error => console.error('Error assigning claims:', error));
});



app.listen(PORT, () => {
    console.log(`server is running of port ${PORT}`);
    connectDB();
});
