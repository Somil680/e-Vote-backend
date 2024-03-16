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
// app.use("/api/room", roomRouter)
// app.use("/api/message", messageRouter)
const server = app.listen(port)



mongoose.connect("mongodb+srv://evotedatabase:VjacREdCnv4R7NF7@e-vote-database.rejtihw.mongodb.net/?retryWrites=true&w=majority&appName=e-vote-database"
)
    .then(() => { server, console.log(` Server running on port ${port}`) })
    .catch((err) => { console.log(err) })



app.get('/', (req, res) => {
    res.send('Hello World!')
})



// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })