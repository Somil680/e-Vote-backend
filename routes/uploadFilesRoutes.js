import express from "express"
import cloudinary from "cloudinary"

const fileRouter = express.Router()
cloudinary.config({
    secure: true,
    cloud_name: "duiavy8qd",
    api_key: "613313498775459",
    api_secret: "SsWY93v-qZ8FbBo5Dk7OdJ5-JSc",
});

fileRouter.post("/", (req, res, next) => {
    const file = req.files.file;
    try {
        cloudinary.v2.uploader
            .upload(file.tempFilePath,)
            .then(result =>
                res.status(200).json({ data: { url: result.url } })
            );

    } catch (error) {
        res.status(400).json({ error })

    }
})

export default fileRouter