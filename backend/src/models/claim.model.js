import mongoose from "mongoose";

const ClaimSchema = mongoose.Schema({
    claimID: {
        type: String,
        required: true,
        unique: true
    },
    agentID: {
        type: String,
        default: null
    },
    clientSummary: {
        type: String,
        required: true
    },
    claimInfo: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    documents: [{ type: String }] // Array of file paths or URLs
});

const Claim = mongoose.model("Claim", ClaimSchema);
export default Claim;