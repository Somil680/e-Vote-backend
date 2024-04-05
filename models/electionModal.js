import mongoose from "mongoose"
import Candidate from "../models/candidateModal.js"
const Schema = mongoose.Schema
const candidateSchema = mongoose.model("Candidate").schema;

const electionSchema = new Schema({
    userId: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    candidates: [{
        type: String,
        ref: "Candidate"
    }],
    election_date: {
        type: Date,
        default: ""
    },

    election_duration: {
        type: Number,
        default: 1
    },
    access_token: {
        type: String,
        default: ""
    },
    isLive: {
        type: Boolean,
        default: false
    }
    // candidates: [candidateSchema]
},
    {
        timestamps: true
    }
)

export default mongoose.model("Election", electionSchema)