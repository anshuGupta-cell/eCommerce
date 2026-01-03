import { headers } from "next/headers";
import { Webhook } from "svix";
import pool from "@/lib/db";

export const POST = async (req) => {

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        return new Response("please add webhook secret in env", { status: 400 })
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Some error occured - no svix headers", { status: 400 })
    }

    const body = await req.text()
    const payload = JSON.parse(body)

    const wh = new Webhook(WEBHOOK_SECRET)
    let evt
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        })
    } catch (error) {
        console.error("Error verifying webhook");
        return new Response("Error occured, verifying webhook", { status: 400 })

    }

    const { id } = evt.data
    const eventType = evt.type
    console.log(id);
    if (eventType === "user.created") {
        try {
            const {
                id: uid,
                first_name,
                last_name,
                username,
                image_url,
                email_addresses,
                primary_email_address_id
            } = evt.data

            // Find primary email
            const primaryEmail = email_addresses?.find(
                (e) => e.id === primary_email_address_id
            )

            const email = primaryEmail?.email_address || null

            // Build a fallback name
            const name =
                [first_name, last_name].filter(Boolean).join(" ") ||
                username ||
                "User"

            await pool.query(
                `INSERT INTO "users" (uid, name, pfp, email)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (uid) DO NOTHING`,
                [uid, name, image_url, email]
            )

            console.log("User saved to DB:", uid)

        } catch (error) {
            console.error("DB insert failed:", error)
            return new Response("DB error", { status: 400 })
        }
    }


    return new Response("Webhook received successfully", { status: 200 })

}


// export const GET = async () => {

//     return Response.json({
//         success: true,
//         message: "Item fetched successfully!",

//     })

// }
