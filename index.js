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

const app = express()
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
const server = app.listen(process.env.PORT || 8000)


mongoose.connect(process.env.MANGO_URI)
    .then(() => { server, console.log(` Server running on port ${process.env.PORT || 8000}`) })
    .catch((err) => { console.log(err) })




