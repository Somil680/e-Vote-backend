import mongoose from 'mongoose';

import asyncHandler from "express-async-handler"
import Election from "../models/electionModal.js"
import AdminUser from "../models/adminUserModal.js"


// POST REQ -ADD ELECTION 
export const postElection = asyncHandler(async (req, res) => {
    const { name, description, userId } = req.body
    let existingUser;

    try {
        existingUser = await AdminUser.findById(userId)
    } catch (error) {
        console.log("🚀 ~ file: electionController.js:48 ~ postElection  error:", error)
        return res.status(404).json({ message: "WE UNABLE TO FETCH USERS" })
    }

    if (!existingUser) {
        return res.status(404).json({ message: "No user found" })
    }
    const elections = new Election({
        userId,
        name,
        description,
        candidates: []
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        // Save the new post
        await elections.save({ session });

        // Push the post into the existingUser's posts array
        // existingUser.election.push(elections);
        // Save the existingUser
        // await existingUser.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        session.endSession();
        console.log("Election created successfully!");
        return res.status(201).json({ elections });

    } catch (error) {
        console.error("Error while adding the Election:", error);
        return res.status(500).json({ message: "Error while adding the Election" });
    }

})
// GET ElECTION BY SINGLE USER ID
export const getElectionById = asyncHandler(async (req, res) => {
    let elections;
    try {
        elections = await Election.find({ userId: req.params.id }).populate("candidates", "name email branch_name year image city state votes");
        console.log("🚀 ~ getElectionById ~ elections:", elections);
    } catch (error) {
        console.log("🚀 ~ getElectionById ~ error:", error);
        return res.status(404).json({ message: "UNABLE TO FETCH ELECTION" });
    }
    if (!elections) {
        return res.status(404).json({ message: "NO ELECTION FOUND" });
    }
    res.status(200).json({ elections });
});
// GET ElECTION BY ELECTION ID

export const getElectionId = asyncHandler(async (req, res) => {
    let elections;
    try {
        elections = await Election.find({ _id: req.params.id }).populate("candidates", "name , email , branch_name , year , image , city , state , votes ")
        console.log("🚀 ~ getElectionById ~ elections:", elections)
    } catch (error) {
        console.log("🚀 ~ getElectionById ~ error:", error)
        return res.status(404).json({ message: "UNABLE TO FETCH ELECTION" })
    }
    if (!elections) {
        return res.status(404).json({ message: "NO ELECTION FOUND" })
    }
    res.status(200).json({ elections })

})

//  UPDATE ElECTION BY ID
export const updateElection = asyncHandler(async (req, res) => {
    const { name, description, election_date, election_duration, access_token, isLive } = req.body
    let election;
    try {
        election = await Election.findByIdAndUpdate(req.params.id, { $set: req.body })
    } catch (error) {
        console.log("🚀 ~ updateElection ~ error:", error)
        return res.status(404).json({ message: "UNABLE TO FETCH " })

    }
    if (!election) {
        return res.status(404).json({ message: "ELECTION NOT FOUND" })
    }

    return res.status(201).json({ message: " ELECTION UPDATE SUCCESSFULLY" })


})
//  DELETE ELECTION BY ID
export const deleteElection = asyncHandler(async (req, res) => {
    const postId = req.params.id
    let election;
    try {
        election = await Election.findByIdAndDelete(req.params.id)
        // await election.user.posts.pull(election)
        // await election.user.save()
    } catch (error) {
        console.log("🚀 ~ deleteElection ~ error:", error)
        return res.status(404).json({ message: "UNABLE TO DELETE " })

    }
    if (!election) {
        return res.status(404).json({ message: "UNABLE TO DELETE" })
    }
    return res.status(200).json({ message: "ELECTION DELETE SUCCESSFULLY" })


})
// GET ALL ELECTION 
export const getAllElection = asyncHandler(async (req, res) => {
    let elections;
    try {
        elections = await Election.find().populate("candidates", "name email branch_name year image city state votes");
    } catch (error) {
        return res.status(404).json({ message: "UNABLE TO FETCH ALL DETAILS ", err: error })
    }
    if (!elections) {
        return res.status(404).json({ message: "NO ELECTION FOUND" })
    }
    res.status(200).json({ elections })

})