import express from "express";
import Agent from "../models/agent.model.js";
import Claim from "../models/claim.model.js";
const router = express.Router();


// Create a new claim
router.post('/', async (req, res) => {
    const { claimID, clientSummary, claimInfo, priority } = req.body;
    const newClaim = new Claim({ claimID, clientSummary, claimInfo, priority });
    await newClaim.save();
    res.status(201).send(newClaim);
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