import express from "express"
const votingRouter = express.Router()
import { postVote } from "../controllers/votingController.js"

// Handle All user 
votingRouter.post("/", postVote)



export default votingRouter
