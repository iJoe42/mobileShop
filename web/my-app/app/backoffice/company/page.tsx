"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "@/app/config";


export default function Page() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [taxCode, setTaxCode] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get(`${config.apiURL}/company/list`);
        setName(res.data.name);
        setAddress(res.data.address);
        setPhone(res.data.phone);
        setEmail(res.data.email);
        setTaxCode(res.data.taxCode);
    }

    const handleSave = async () => {
        try {
            const payload = {
                name: name,
                address: address,
                phone: phone,
                email: email,
                taxCode: taxCode
            }

            const response = await axios.post(`${config.apiURL}/company/create`, payload);
            Swal.fire({
                icon: "success",
                title: "Company data saved!",
                timer: 2000
            });

        } catch(err) {
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Cannot save data"
            });
        }
    }

    return (
        <div>
            <h1 className="content-header">ข้อมูลร้าน</h1>

            <div>
                <div className="mt-4 ">ชื่อร้าน</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                
                <div className="mt-4">ที่อยู่</div>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>

                <div className="mt-4">เบอร์โทร</div>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>

                <div className="mt-4">อีเมลล์</div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                
                <div className="mt-4">รหัสประจำตัวผู้เสียภาษี</div>
                <input type="text" value={taxCode} onChange={(e) => setTaxCode(e.target.value)}/>

                <div>
                    <button className="mt-4 btn" onClick={handleSave}>
                        <i className="fa fa-save mr-2"></i>
                        บันทึก
                    </button>
                </div>


            </div>

        </div>
    );
}