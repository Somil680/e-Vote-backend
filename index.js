import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import mongoose from "mongoose"

const app = express()
const port = 5000


dotenv.config();

// app.use(fileUpload({
//     useTempFiles: true
// }))
app.use(cors())
app.use(express.json())

// app.use("/api/user", router)
// app.use("/api/post", postRouter)
// app.use("/api/auth", authRouter)
// app.use("/api/uploadFile", fileRouter)
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