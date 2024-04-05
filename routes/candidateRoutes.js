import express from "express"
const candidateRouter = express.Router()
import { postCandidate, getCandidatesById, updateCandidateById, deleteCandidate } from "../controllers/candidateController.js"

// Handle All user 
candidateRouter.post("/add/:id", postCandidate)
candidateRouter.get("/:id", getCandidatesById)
candidateRouter.patch("/update/:id", updateCandidateById)
candidateRouter.delete("/delete/:id", deleteCandidate)


export default candidateRouter
