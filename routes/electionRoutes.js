import express from "express"
const electionRouter = express.Router()
import { getAllElection, postElection, getElectionById, updateElection, deleteElection, getElectionId } from "../controllers/electionController.js"

// Handle All user 
electionRouter.get("/", getAllElection)
electionRouter.post("/add", postElection)
electionRouter.get("/:id", getElectionById)
electionRouter.get("/id/:id", getElectionId)
electionRouter.patch("/update/:id", updateElection)
electionRouter.delete("/delete/:id", deleteElection)


export default electionRouter
