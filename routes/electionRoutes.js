import express from "express"
const electionRouter = express.Router()
import { postElection, getElectionById, updateElection, deleteElection } from "../controllers/electionController.js"

// Handle All user 
electionRouter.post("/add", postElection)
electionRouter.get("/:id", getElectionById)
electionRouter.patch("/update/:id", updateElection)
electionRouter.delete("/delete/:id", deleteElection)


export default electionRouter
