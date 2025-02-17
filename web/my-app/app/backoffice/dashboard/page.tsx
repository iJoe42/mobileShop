"use client";

import { useState, useEffect } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
 } from "recharts";
 import axios from "axios";
 import { config } from "@/app/config";
 import Swal from "sweetalert2";


export default function Page() {
    const [data, setData] = useState<any[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalJob, setTotalJob] = useState(0);
    const [totalSale, setTotalSale] = useState(0);

    useEffect(() => {
        fetchDashboardData();
        renderChart();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await axios.get(`${config.apiURL}/sell/dashboard`);
            setTotalIncome(res.data.totalIncome);
            setTotalJob(res.data.totalJob);
            setTotalSale(res.data.totalSale);
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Failed to fetch dashboard data",
                text: error.message
            })
        }
    }

    const renderChart = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" 
        ];

        // generate test data
        const data = months.map((month, index) => ({
            name: month,
            income: Math.floor(Math.random() * 10000)
        }));
        setData(data);
    }

    const box = (color: String, title: String, value: String) => {
        return(
            <div className={`flex flex-col gap-4 items-end w-full ${color} p-4 rounded-lg text-white`}>
                <div className="text-2xl font-bold">{title}</div>
                <div className="text-4xl font-bold">{value}</div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="content-header">Dashboard</h1>
            <div className="flex gap-4">
                {box("bg-purple-600", "ยอดขายทั้งหมด", totalIncome.toLocaleString())}
                {box("bg-orange-500", "งานรับซ่อม", totalJob.toLocaleString())}
                {box("bg-blue-500", "รายการขาย", totalSale.toLocaleString())}
            </div>

            <div className="text-center mb-4 mt-5 text-xl font-bold">รายได้แต่ละเดือน</div>
            <div style={{width: "100%", height: 400}}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `รายได้ ${value.toLocaleString()} บาท`} />
                        <Legend />
                        <Bar dataKey="income" fill="teal" opacity={0.65} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}