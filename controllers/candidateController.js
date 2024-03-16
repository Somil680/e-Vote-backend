import mongoose from 'mongoose';

import asyncHandler from "express-async-handler"
import Candidate from "../models/candidateModal.js"
import AdminUser from "../models/adminUserModal.js"


// POST REQ -ADD ELECTION

export const postCandidate = asyncHandler(async (req, res) => {
    const { name, email, branch_name, year, image, city, state, electionId, vote_achieved } = req.body
    const userId = req.params.id
    let existingUser;
    try {
        existingUser = await AdminUser.findById(userId)
    } catch (error) {
        console.log("🚀 ~ postCandidate ~ error:", error)
        return res.status(500).json({ message: "UNABLE FETCH USERS" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "No user found" })
    }
    const candidate = new Candidate({
        electionId, name, email, branch_name, year, image, city, state, vote_achieved
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        // Save the new post
        await candidate.save({ session });

        // Push the candidate into the candidates array of the found election
        // existingUser.election[electionIndex].candidates.push(candidate);
        // Save the existingUser
        // await existingUser.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        console.log("Candidate registered successfully!");
        return res.status(201).json({ candidate });
    } catch (error) {
        console.error("Error while adding the post:", error);
        return res.status(500).json({ message: "Error while registered candidate" });
    }
})

// GET CANDIDATES BY ELECTION  ID
export const getCandidatesById = asyncHandler(async (req, res) => {
    let candidate;
    try {
        candidate = await Candidate.find({ electionId: req.params.id })
    } catch (error) {
        console.log("🚀 ~ getCandidatesById ~ error:", error)
        return res.status(404).json({ message: "UNABLE TO FETCH CANDIDATES" })
    }
    if (!candidate) {
        return res.status(404).json({ message: "NO CANDIDATE FOUND" })
    }
    res.status(200).json({ candidate })

})

//  UPDATE CANDIDATE BY ID
export const updateCandidate = asyncHandler(async (req, res) => {
    const { name, email, branch_name, year, image, city, state } = req.body
    let candidate;
    try {
        candidate = await Candidate.findByIdAndUpdate(req.params.id, {
            name, email, branch_name, year, image, city, state
        })
    } catch (error) {
        console.log("🚀 ~ updateCandidate ~ error:", error)
        return res.status(404).json({ message: "UNABLE TO UPDATE " })
    }
    if (!candidate) {
        return res.status(404).json({ message: "CANDIDATE NOT FOUND" })
    }
    return res.status(201).json({ message: " CANDIDATE UPDATE FOUND" })


})
//  DELETE ELECTION BY ID
export const deleteCandidate = asyncHandler(async (req, res) => {
    let candidate;
    try {
        candidate = await Candidate.findByIdAndDelete(req.params.id)
        // await election.user.posts.pull(election)
        // await election.user.save()
    } catch (error) {
        console.log("🚀 ~ deleteCandidate ~ error:", error)
        return res.status(404).json({ message: "UNABLE TO DELETE " })
    }
    if (!candidate) {
        return res.status(404).json({ message: "UNABLE TO DELETE" })
    }
    return res.status(200).json({ message: " CANDIDATE DELETE SUCCESSFULLY" })


})