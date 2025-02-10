"use client";

import { useState, useEffect } from "react";
import { config } from "@/app/config";
import axios from "axios";
import Swal from "sweetalert2";

export default function Page() {
    const [serial, setSerial] = useState("");
    const [price, setPrice] = useState(0);

    const handleSave = async () => {
        try {
            const payload = {
                serial: serial,
                price: price
            }
            axios.post(`${config.apiURL}/sell/create`, payload);
            fetchSellData();
        } catch(err: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot save data",
                text: err.message
            });
        }
    }

    const fetchSellData = async () => {

    }

    useEffect(() => {
        fetchSellData();
    }, []);

    return (
        <div>
            <h1 className="content-header">ขายสินค้า</h1>
            <div className="flex gap-3 items-end">
                <div>
                    <div>Serial No.</div>
                    <input className="form-control" type="text" onChange={(e) => setSerial(e.target.value)} placeholder="Serial No." />
                </div>
                <div>
                    <div>Price</div>
                    <input className="form-control" type="number" onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />                    
                </div>
                <div>
                    <button className="btn" onClick={handleSave}>
                        <i className="fa-solid fa-save mr-2"></i>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}