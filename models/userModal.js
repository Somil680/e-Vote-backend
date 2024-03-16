import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    name: {
        type: String,
        default: ""
    },
    enrollment_id: {
        type: String,
        default: ""
    },
    branch: {
        type: String,
        default: null
    },
    year: {
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
    votedIn: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election'
    }]
},
    {
        timestamps: true
    }
)

export default mongoose.model("User", userSchema)