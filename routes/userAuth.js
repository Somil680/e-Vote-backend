import express from "express"
const userAuthRouter = express.Router()
import { signUp, logIn, getData } from "../controllers/userController.js"

// Handle All user 
userAuthRouter.post("/signup", signUp)
userAuthRouter.post("/login", logIn)
userAuthRouter.get("/:id", getData)


export default userAuthRouter
