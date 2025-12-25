import cloudinary from "@/lib/cloudinary";
import uploadToCloudinary from "@/lib/uploadToCloudinary";

export const POST = async (req) => {
    const formData = await req.formData()
    const imgFile = formData.get("img")

   const url = await uploadToCloudinary(imgFile)

    return Response.json({
        success: true,
        url
    })

}