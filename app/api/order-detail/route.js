import pool from "@/lib/db"

export const GET = async (req) => {
    const searchParams = new URL(req.url).searchParams
    const uid = searchParams.get("uid")
    const oid = searchParams.get("oid")
    console.log(uid, oid);

    try {
        const res = await pool.query(`select
            o.address, o.date, o.description, o.mobile_no, o.status, o.total_amount , 
            json_agg(json_build_object(
                'qty', oi.qty,
                'item_id', i.item_id,
                'item_name', i.item_name,
                'price', i.price,
                'description', i.description,
                'item_pic', i.item_pic,
                'stock', i.stock
            )) as order_items
            from "order" o
            join "order_item" oi
            on o.oid = oi.oid
            join "item" i
            on oi.item_id = i.item_id
            where o.uid = $1 and o.oid = $2
            group by
            o.address, o.date, o.description, o.mobile_no, o.status, o.total_amount
            `, [uid, oid])

        return Response.json({
            success: true,
            message: "Status fetched successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to fetch status. Some error occured!",
            details: error
        })
    }
}