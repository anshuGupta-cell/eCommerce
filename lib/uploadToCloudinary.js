import cloudinary from "./cloudinary";

// this can upload any type of file
const uploadToCloudinary = async (file) => {

    const buffer = Buffer.from(await file.arrayBuffer())
    const res = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "eCommerce" },
            (err, res) => (err ? reject(err) : resolve(res))
        )
        stream.end(buffer);
    })

    return res.secure_url

}

export default uploadToCloudinary;