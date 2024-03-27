import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import fileUpload from "express-fileupload"

import mongoose from "mongoose"
import adminRouter from "./routes/adminAuth.js"
import userRouter from "./routes/userAuth.js"
import fileRouter from "./routes/uploadFilesRoutes.js"
import electionRouter from "./routes/electionRoutes.js"
import candidateRouter from "./routes/candidateRoutes.js"
import votingRouter from "./routes/votingRoutes.js"
import mailRouter from './routes/mail.js';
// import nodemailer from "nodemailer"

const app = express()
const port = 5000
dotenv.config();
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cors())
app.use(express.json())

app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/election", electionRouter)
app.use("/api/candidate", candidateRouter)
app.use("/api/vote", votingRouter)
app.use("/api/uploadFile", fileRouter)
app.use("/api", mailRouter)
// app.use("/api/message", messageRouter)
const server = app.listen(port)


// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//         user: process.env.USER,
//         pass: process.env.PASSWORD,
//     },
// });
// const mailOption = {
//     from: {
//         name: " E-vote",
//         address: process.env.USER,
//     },
//     to: "somil25ic059@satiengg.in",
//     subject: " Send mail using node mailer sakshi is donkey ",
//     text: " Hello world",
//     html: " <b>Hello world </b>"

// }

// const sendMail = async (transporter, mailOption) => {
//     try {
//         await transporter.sendMail(mailOption)
//         console.log("Sent mail")
//     } catch (error) {
//         console.log("🚀 ~ sendMail ~ error:", error)

//     }

// }
// sendMail(transporter, mailOption)




mongoose.connect("mongodb+srv://evotedatabase:VjacREdCnv4R7NF7@e-vote-database.rejtihw.mongodb.net/?retryWrites=true&w=majority&appName=e-vote-database"
)
    .then(() => { server, console.log(` Server running on port ${port}`) })
    .catch((err) => { console.log(err) })




