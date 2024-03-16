import express from "express"
const candidateRouter = express.Router()
import { postCandidate, getCandidatesById, updateCandidate, deleteCandidate } from "../controllers/candidateController.js"

// Handle All user 
candidateRouter.post("/add/:id", postCandidate)
candidateRouter.get("/:id", getCandidatesById)
candidateRouter.patch("update/:id", updateCandidate)
candidateRouter.delete("delete/:id", deleteCandidate)


export default candidateRouter
