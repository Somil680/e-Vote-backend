import asyncHandler from "express-async-handler"
import AdminUser from "../models/adminUserModal.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// POST  SIGNUP USER
export const signUp = asyncHandler(async (req, res) => {
    const { email, password, name, } = req.body
    let existingUser;

    try {
        existingUser = await AdminUser.findOne({ email });
    } catch (error) {
        console.log("🚀 ~ file: userControler.js:9 ~ getAllUser ~ error:", error)
    }
    if (existingUser) {
        res.status(400).json({ message: "Already exist User" })
    }
    const hashPassword = bcrypt.hashSync(password)
    const user = new AdminUser({
        name,
        email,
        password: hashPassword,
        election: [],
    })
    try {
        await user.save()
    } catch (error) {
        console.log("🚀 ~ file: userControler.js:36 ~ signUp ~ error:", error)

    }
    return res.status(201).json({ user })
})

// POST  LOGIN USER
export const logIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await AdminUser.findOne({ email });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }
    const passwordComparer = bcrypt.compareSync(password, existingUser.password);
    if (passwordComparer) {
        const accessToken = jwt.sign({
            user: {
                name: existingUser.name,
                email: existingUser.email,
                id: existingUser.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d" });

        const user = {
            ...existingUser.toObject(),
            token: { accessToken }
        }
        console.log("Updated existingUser:", user);
        return res.status(200).json({ user });
    } else {
        return res.status(400).json({ message: "Email and password do not match" });
    }
});

