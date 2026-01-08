'use client'
import OrderStatusCard from "@/components/orderStatusCard/OrderStatusCard"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const MyOrder = () => {

    const [orders, setOrders] = useState([])
    const fetchData = async () => {
        try {
            const res = await fetch("/api/order", { cache: "no-store" })
            const data = await res.json()
            setOrders(data.res.rows)
            console.log(data.res);

        } catch (error) {
            toast("Failed to get items")
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="py-40 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">
            <div className="max-w-5xl m-auto grid res-grid-280 gap-2 ">

                {orders.map((order) => (
                    <div key={order.oid} className="grid gap-2 bg-slate-800 rounded-lg p-2 ">
                        <ul className="">
                            <ul className="flex justify-between">
                                <p className="font-bold">Order id: {order.oid}</p>
                                <p className="text-sm">{order.date}</p>
                            </ul>
                            <ul >
                                <p>Mobile no: {order.mobile_no}</p>
                                <p>Address: {order.address}</p>
                                {/* <p>Total items: 5</p> */}
                                <p>Total amount: {order.total_amount} Rs</p>
                            </ul>
                        </ul>
                        <ul className="flex w-full justify-between text-sm font-semibold">
                            <Link href={`/my-order/${order.oid}`} className="">see more details</Link>
                            <p>Order Status: {order.status}</p>
                        </ul>
                    </div>
                ))}

            </div>
        </section >

    )
}

export default MyOrder