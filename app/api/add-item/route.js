import cloudinary from "@/lib/cloudinary";
import pool from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

// add item, vendor or admin adds this items
export const POST = async (req) => {
    const formData = await req.formData()
    const imgFile = formData.get("img")
    const data = formData.get("data")
    const { item_name, eid, price, description, item_pic, stock } = JSON.parse(data)
    // const { item_name, eid, price, description, item_pic, stock } = body

    const buffer = Buffer.from(await imgFile.arrayBuffer())
    const upload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "eCommerce" },
            (err, res) => (err ? reject(err) : resolve(res))
        )
        stream.end(buffer);
    })
    const url = upload.secure_url

    console.log(item_name, eid, price, description, item_pic, stock);
    try {
        const res = await pool.query(`insert into item(item_name, eid, price, description, item_pic, stock) values($1, $2, $3, $4, $5, $6) RETURNING item_id`, [item_name, eid, price, description, item_pic, stock])

        return Response.json({
            success: true,
            message: "Item added successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to add Item. Some error ocurred!",
            details: error

        })

    }

}

// get all details from item
export const GET = async () => {
    try {
        const res = await pool.query(`select * from item`)

        return Response.json({
            success: true,
            message: "Item added successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to add Item. Some error ocurred!",
            details: error

        })

    }
}