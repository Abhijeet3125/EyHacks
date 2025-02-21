import mongoose from "mongoose";

const agentSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        fullName: {
            type: String,
            required: true,

        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        profilePic: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;