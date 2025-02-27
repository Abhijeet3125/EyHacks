import express from "express";
import Agent from "../models/agent.model.js";
import Claim from "../models/claim.model.js";
const router = express.Router();


let seed = 1000; // Initial seed value for claimID

// Create a new claim
router.post('/', async (req, res) => {
    const { clientName, claimType } = req.body;

    // Generate claimID based on seed
    const claimID = `CLM-${seed++}`;

    // Assign priority based on claimType
    let priority;
    switch (claimType) {
        case 'medical':
            priority = 5;
            break;
        case 'financial':
            priority = 4;
            break;
        default:
            priority = 1; // Default priority for other claim types
    }

    // Fetch clientSummary from another endpoint (assuming it's already available)
    const clientSummary = "Fetched from another endpoint lorem A car, or an automobile, is a motor vehicle with wheels. Most definitions of cars state that they run primarily on roads, seat one to eight people, have four wheels, and mainly transport people rather than cargo.[1][2] There are around one billion cars in use worldwide."; // Replace with actual fetch logic

    // Create new claim
    const newClaim = new Claim({ claimID, clientName, claimType, priority, clientSummary });
    await newClaim.save();

    // Return the claimID to the frontend
    res.status(201).send({ claimID });
});

// Assign claims to agents
router.post('/assign', async (req, res) => {
    const claims = await Claim.find({ agentID: null });
    const agents = await Agent.find({});

    claims.forEach(async (claim) => {
        const agent = agents.find(a => {
            if (claim.priority >= 3) {
                return a.numOFhighpriorityclaims < 3;
            } else {
                return a.numOFlowpriorityclaims < 5;
            }
        });

        if (agent) {
            claim.agentID = agent.agentID;
            if (claim.priority >= 3) {
                agent.numOFhighpriorityclaims += 1;
            } else {
                agent.numOFlowpriorityclaims += 1;
            }
            await claim.save();
            await agent.save();
        }
    });

    res.send('Claims assigned');
});

// Get claims for an agent
router.get('/agent/:agentID', async (req, res) => {
    const claims = await Claim.find({ agentID: req.params.agentID });
    res.send(claims);
});

//search claim by claim ID
router.get('/search/:claimID', async (req, res) => {
    try {
        const claim = await Claim.findOne({ claimID: req.params.claimID });
        if (claim) {
            res.status(200).send(claim);
        } else {
            res.status(404).send('Claim not found');
        }
    } catch (error) {
        res.status(500).send('Error searching for claim');
    }
});

export default router;