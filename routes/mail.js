import express from "express"
import nodemailer from "nodemailer"
import asyncHandler from "express-async-handler"

const mailRouter = express.Router()

// Handle All user 
mailRouter.post("/mail", asyncHandler(async (req, res,) => {
    const { email: receiverEmail } = req.body
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    });
    const mailOption = {
        from: {
            name: " E-vote",
            address: process.env.USER,
        },
        to: receiverEmail,
        subject: " Send mail using node mailer",
        text: "TESTING PHASE",
        html: " <b>Hello world </b>"

    }
    try {
        const mail = await transporter.sendMail(mailOption)
        console.log("Sent mail")
        return res.status(200).json({ message: mail });

    } catch (error) {
        console.log("🚀 ~ sendMail ~ error:", error)
        return res.status(200).json({ message: error });

    }
}))

export default mailRouter

// const sendMail = async (transporter, mailOption) => {
//     try {
//         await transporter.sendMail(mailOption)
//         console.log("Sent mail")
//     } catch (error) {
//         console.log("🚀 ~ sendMail ~ error:", error)
//     }
// }
// sendMail(transporter, mailOption)