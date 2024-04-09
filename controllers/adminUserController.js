import asyncHandler from "express-async-handler"
import AdminUser from "../models/adminUserModal.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// POST REQUEST TO SENT OPT IN THE MAIL 
export const sentOTPMail = asyncHandler(async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json({ message: "Operation successful", user: user })
    } catch (error) {
        res.status(500).json({ error })
    }

})

// POST  SIGNUP USER
export const signUp = asyncHandler(async (req, res) => {
    const { email, password, name, department_name, college_name, city, state } = req.body
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
        department_name,
        college_name,
        city, state,
        election: [],
    })


    try {
        await user.save()
    } catch (error) {
        console.log("🚀 ~ file: userControler.js:36 ~ signUp ~ error:", error)

    }
    return res.status(201).json({ user })
})

// GET THE SINGLE USER
export const getData = asyncHandler(async (req, res) => {
    try {
        const user = await AdminUser.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// export const getData = asyncHandler(async (req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
//         res.status(200).json({ message: "Operation successful", user: user })
//     } catch (error) {
//         res.status(500).json({ error })
//     }
//     if (req.body.userId === req.params.userId) {
//     } else {
//         res.status(403).json({ message: "You cant not update your account" })
//     }
// })
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

