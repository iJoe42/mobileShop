"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/app/config";
import Swal from "sweetalert2";
import Modal from "@/app/backoffice/modal";

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);

    const [serial, setSerial] = useState("");
    const [name, setName] = useState("");
    const [release, setRelease] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState(0);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [remark, setRemark] = useState("");

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleSave = async () => {
        try {
            const payload = {
                serial: serial,
                name: name,
                release: release,
                color: color,
                price: price,
                customerName: customerName,
                customerPhone: customerPhone,
                customerAddress: customerAddress,
                remark: remark
            }

            await axios.post(`${config.apiURL}/buy/create`, payload);

            Swal.fire({
                icon: "success",
                title: "Saved!",
                text: "Your data is saved!",
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
        <>

            <h1 className="content-header">รายการซื้อ</h1>

            <div>
                <button className="btn" onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    เพิ่มรายการ
                </button>
            </div>

            <Modal title="เพิ่มรายการ" isOpen={isOpen} onClose={handleCloseModal}>
                <div>Serial No.</div>
                <input type="text" value={serial} onChange={(e) => setSerial(e.target.value)} />
                <div>Product Name: </div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <div>Release Date:</div>
                <input type="text" value={release} onChange={(e) => setRelease(e.target.value)} />
                <div>Color: </div>
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                <div>Price: </div>
                <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <div>Customer Name: </div>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                <div>Customer Phone: </div>
                <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                <div>Customer Address: </div>
                <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                <div>Remark: </div>
                <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />

                <div className="mt-2">
                    <button className="btn" onClick={handleSave}>
                        <i className="fa-solid fa-save mr-2"></i>
                        บันทึก
                    </button>
                </div>
            </Modal>

        </>
    );
}