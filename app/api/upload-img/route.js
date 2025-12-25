import cloudinary from "@/lib/cloudinary";

export const POST = async (req) => {
    const formData = await req.formData()
    const {name, age} = JSON.parse(formData.get("data"))
    const imgFile = formData.get("img")

    const buffer = Buffer.from(await imgFile.arrayBuffer())
    const res = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "eCommerce" },
            (err, res) => (err ? reject(err) : resolve(res))
        )
        stream.end(buffer);
    })


    return Response.json({
        success: true,
        url: res.secure_url,
        res
    })

}