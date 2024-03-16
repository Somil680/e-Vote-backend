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
    candidates: [candidateSchema]
},
    {
        timestamps: true
    }
)

export default mongoose.model("Election", electionSchema)