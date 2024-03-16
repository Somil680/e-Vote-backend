import express from "express"
const userAuthRouter = express.Router()
import { signUp, logIn } from "../controllers/userController.js"

// Handle All user 
userAuthRouter.post("/signup", signUp)
userAuthRouter.post("/login", logIn)


export default userAuthRouter
