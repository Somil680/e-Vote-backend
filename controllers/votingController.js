import mongoose from 'mongoose';

import asyncHandler from "express-async-handler"
import Candidate from "../models/candidateModal.js"
import Election from "../models/electionModal.js"
import User from "../models/userModal.js"
import AdminUser from "../models/adminUserModal.js"


//  UPDATE CANDIDATE BY ID
export const postVote = asyncHandler(async (req, res) => {
    const { electionId, voterId, candidateId } = req.body;

    try {
        // Check if the election exists
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ message: 'Election not found' });
        }

        // Check if the voter exists
        const voter = await User.findById(voterId);
        console.log("🚀 ~ postVote ~ voter:", voter)
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        // Check if the voter has already cast a vote in this election
        if (voter.votedIn.includes(electionId)) {
            return res.status(400).json({ message: 'Voter has already cast a vote in this election' });
        }

        // Check if the candidate exists and belongs to the specified election
        const candidate = await Candidate.findOne({ _id: candidateId, electionId: electionId });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found in this election' });
        }

        // Update the election's vote count for the selected candidate
        candidate.votes++;
        await candidate.save();

        // Update the voter's votedIn array to mark this election as voted
        voter.votedIn.push(electionId);
        await voter.save();

        // Return success response
        return res.status(200).json({ message: 'Vote cast successfully' });

    } catch (error) {
        console.error('Error casting vote:', error);
        return res.status(500).json({ message: 'Error casting vote' });
    }


})