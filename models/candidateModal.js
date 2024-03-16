import mongoose from "mongoose"

const Schema = mongoose.Schema

const candidateSchema = new Schema({
    electionId: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    branch_name: {
        type: String,
        default: ""
    },
    year: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    votes: {
        type: Number,
        default: 0
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election'
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model("Candidate", candidateSchema)