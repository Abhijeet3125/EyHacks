import mongoose from  "mongoose"

const AgentSchema = mongoose.Schema({
    agentID: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    numOFhighpriorityclaims: { type: Number, default: 0 },
    numOFlowpriorityclaims: { type: Number, default: 0 }
});

const Agent = mongoose.model("Agent", AgentSchema);
export default Agent;