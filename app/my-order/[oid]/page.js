"use client"
import ItemCard from '@/components/itemCard/ItemCard'
import OrderStatusCard from '@/components/orderStatusCard/OrderStatusCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const { oid } = useParams()
    const [orderData, setOrderData] = useState({})
    const [items, setItems] = useState([])

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/order-detail?uid=1&oid=${oid}`, { cache: "no-store" })
            const data = await res.json()
            console.log(data.res.rows[0]);

            setOrderData(data.res.rows[0])
            setItems(data.res.rows[0].order_items)
        } catch (error) {
            toast("Failed to get order details!")
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="py-32 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">
            <div className='max-w-5xl m-auto'>
                <div className='grid res-grid-280 gap-2'>
                    <ul>
                        <h3 className='font-bold'>Order Items</h3>
                        <div className="grid gap-2 rounded-lg p-2 ">
                            <ul className="flex gap-12 text-nowrap">
                                <p className="font-bold">Order id: {orderData.oid}</p>
                                <p className="text-sm">{orderData.date}</p>
                            </ul>
                            <ul >
                                <p>Mobile no: {orderData.mobile_no}</p>
                                <p>Address: {orderData.address}</p>
                                <p>Total items: {items.length}</p>
                                <p>Total amount: {orderData.total_amount} Rs</p>
                            </ul>
                        </div>
                    </ul>
                    <ul>
                        <OrderStatusCard status={orderData.status} />
                    </ul>
                </div>
                <ul>
                    <h3 className='font-bold'>Order Items</h3>
                    <div className=" grid res-grid-280 gap-2">

                        {items.map((item) => (
                            <ItemCard
                                item={item}
                                qty={item.qty}
                            />
                        ))}
                    </div>
                </ul>
            </div>
        </section >
    )
}

export default page