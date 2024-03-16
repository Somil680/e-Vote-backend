import mongoose from "mongoose";
import Election from "../models/electionModal.js"
const { Schema } = mongoose;

const electionSchema = mongoose.model("Election").schema;

const adminUserSchema = new Schema({
    email: {
        required: true,
        type: String,
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

    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    election: [Schema.Types.Mixed]
}, {
    timestamps: true
});

export default mongoose.model("AdminUser", adminUserSchema);
