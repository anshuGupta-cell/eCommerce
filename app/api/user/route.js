import pool from "@/lib/db"

const { default: getUserId } = require("@/lib/getUser")

export const GET  = async () => {
    const uid = await getUserId()
    const res = await pool.query(`select * from "users"`)
    return Response.json({
        uid,
        res
    })
}