"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const { oid } = useParams()
    const [order, setOrder] = useState([])
    const [items, setItems] = useState([])

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/order-detail?uid=1&oid=${oid}`, {cache: "no-store"})
            const data = await res.json()
            console.log(data);
            
            setOrder(data)
        } catch (error) {
            toast("Failed to get order details!")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="py-32 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">
            <div className="max-w-5xl m-auto">

                

            </div>
        </section>
    )
}

export default page