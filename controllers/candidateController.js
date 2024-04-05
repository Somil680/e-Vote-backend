import mongoose from 'mongoose';

import asyncHandler from "express-async-handler"
import Candidate from "../models/candidateModal.js"
import AdminUser from "../models/adminUserModal.js"
import Election from "../models/electionModal.js"


// POST REQ -ADD ELECTION

export const postCandidate = asyncHandler(async (req, res) => {
    const { name, email, branch_name, year, image, city, state, vote_achieved, electionId } = req.body;
    const userId = req.params.id;
    // Check if the admin user exists
    let existingUser;
    try {
        existingUser = await AdminUser.findById(userId);
    } catch (error) {
        console.log("Error while finding admin user:", error);
        return res.status(500).json({ status: 500, message: "Error while fetching user" });
    }
    if (!existingUser) {
        return res.status(404).json({ status: 404, message: "Admin user not found" });
    }
    // Create candidate instance
    const candidate = new Candidate({
        electionId,
        name,
        email,
        branch_name,
        year,
        image,
        city,
        state,
        vote_achieved
    });

    let session;
    try {
        // Start transaction session
        session = await mongoose.startSession();
        session.startTransaction();

        // Save candidate
        await candidate.save({ session });

        // Find and update election with new candidate
        const election = await Election.findById(electionId).session(session);
        if (!election) {
            throw new Error("Election not found");
        }

        // Push candidate id into candidates array of election
        election.candidates.push(candidate._id);
        // Save updated election
        await election.save({ session });
        // Commit transaction
        await session.commitTransaction();
        console.log("Candidate registered successfully!");
        return res.status(201).json({ status: 201, message: candidate });
    } catch (error) {
        console.error("Error while adding candidate:", error);
        // Rollback transaction if any error occurs
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        return res.status(500).json({ status: 500, message: "Error while registering candidate" });
    }
});


// export const postCandidate = asyncHandler(async (req, res) => {
//     const { name, email, branch_name, year, image, city, state, electionId, vote_achieved } = req.body
//     const userId = req.params.id
//     let existingUser;
//     try {
//         existingUser = await AdminUser.findById(userId)
//     } catch (error) {
//         console.log("🚀 ~ postCandidate ~ error:", error)
//         return res.status(500).json({ message: "UNABLE FETCH USERS" });
//     }
//     if (!existingUser) {
//         return res.status(404).json({ message: "No user found" })
//     }
//     const candidate = new Candidate({
//         electionId, name, email, branch_name, year, image, city, state, vote_achieved
//     })
//     try {
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         // Save the new post
//         await candidate.save({ session });
//         let election = await Election.findById(electionId)
//         console.log("🚀 ~ postCandidate ~ election:", election)
//         // Push the candidate into the candidates array of the found election
//         // election.candidates.push(candidate);
//         await election.updateOne({ $push: { candidates: candidate.electionId } })
//         // Save the existingUser
//         await election.save({ session });
//         console.log("🚀 ~ postCandidate ~ election:", election)

//         // Commit the transaction
//         await session.commitTransaction();
//         session.endSession();
//         console.log("Candidate registered successfully!");
//         return res.status(201).json({ candidate });
//     } catch (error) {
//         console.error("Error while adding the post:", error);
//         return res.status(500).json({ message: "Error while registered candidate" });
//     }
// })

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
export const updateCandidateById = asyncHandler(async (req, res) => {
    console.log("🚀 ~ updateCanSdidate ~ candidate:", req.params.id)
    const { name, email, branch_name, year, image, city, state } = req.body

    let candidate;
    try {
        candidate = await Candidate.findByIdAndUpdate(req.params.id, {
            name, email, branch_name, year, image, city, state
        })
        console.log("🚀 ~ updateCandidate ~ candidate:", candidate)
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