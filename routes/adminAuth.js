import express from "express"
const adminAuthRouter = express.Router()
import { signUp, logIn } from "../controllers/adminUserController.js"

// Handle All user 
adminAuthRouter.post("/signup", signUp)
adminAuthRouter.post("/login", logIn)


export default adminAuthRouter
