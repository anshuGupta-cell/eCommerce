import { headers } from "next/headers"
import { Webhook } from "svix"
import pool from "@/lib/db"

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  try {
    if (!WEBHOOK_SECRET) {
      console.error("Missing webhook secret")
      return new Response("OK", { status: 200 })
    }

    const h = headers()
    const svix_id = h.get("svix-id")
    const svix_timestamp = h.get("svix-timestamp")
    const svix_signature = h.get("svix-signature")

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("OK", { status: 200 })
    }

    const body = await req.text()
    const wh = new Webhook(WEBHOOK_SECRET)

    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    })

    // 🔹 respond immediately
    const response = new Response("OK", { status: 200 })

    // 🔹 async work AFTER response
    if (evt.type === "user.created") {
      queueMicrotask(async () => {
        try {
          const { email_addresses, primary_email_address_id } = evt.data

          const primaryEmail = email_addresses.find(
            (email) => email.id === primary_email_address_id
          )

          if (!primaryEmail) return

          await pool.query(
            `INSERT INTO "users" (uid, email) VALUES ($1, $2)`,
            [evt.data.id, primaryEmail.email_address]
          )

          console.log("User created:", evt.data.id)
        } catch (err) {
          console.error("DB error:", err)
        }
      })
    }

    return response
  } catch (err) {
    console.error("Webhook failure:", err)
    return new Response("OK", { status: 200 })
  }
}

export const GET = async () => {

        return Response.json({
            success: true,
            message: "Item fetched successfully!",
            
        })

}
