import mongoose from "mongoose"

const Schema = mongoose.Schema

const adminUserSchema = new Schema({
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
    department_name: {
        type: String,
        default: ""
    },
    college_name: {
        type: String,
        default: ""
    },
    election_id: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    election: [Schema.Types.Mixed]
},
    {
        timestamps: true
    }
)

export default mongoose.model("AdminUser", adminUserSchema)