import express from "express"
const adminAuthRouter = express.Router()
import { signUp, logIn, getData } from "../controllers/adminUserController.js"

// Handle All user 
adminAuthRouter.post("/signup", signUp)
adminAuthRouter.post("/login", logIn)
adminAuthRouter.get("/:id", getData)


export default adminAuthRouter
