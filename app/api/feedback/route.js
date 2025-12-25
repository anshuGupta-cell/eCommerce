import pool from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server";

//add a feedback of item
export const POST = async (req) => {
    const body = await req.json()
    const { description, item_id, uid } = body
    
    try {

        const res = await pool.query(`INSERT INTO "feedback" (description, item_id, uid) values($1, $2, $3)`, [description, item_id, uid])

        return Response.json({
            success: true,
            message: "Feedback added successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to add feedback. Some error occured!",
            details: error
        })
    }
}

//Get feedback by item_id
export const GET = async (req) => {

    const { searchParams } = new URL(req.url)
    const item_id = searchParams.get("item_id")

    try {
        const res = await pool.query(`SELECT description, uid from "feedback" where item_id = $1`, [item_id])

        return Response.json({
            success: true,
            message: "Feedback fetched successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to fetch feedback. Some error occured!",
            details: error
        })
    }
}

// delete feedback by id
export const DELETE = async(req) =>{
    const body= await req.json()
    try {
        
    } catch (error) {
        
    }
}