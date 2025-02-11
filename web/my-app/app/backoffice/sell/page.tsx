"use client";

import { useState, useEffect } from "react";
import { config } from "@/app/config";
import axios from "axios";
import Swal from "sweetalert2";

export default function Page() {
    const [serial, setSerial] = useState("");
    const [price, setPrice] = useState(0);
    const [sellList, setSellList] = useState([]);
    const [id, setId] = useState("");
    const [totalAmount, settotalAmount] = useState(0);

    const handleSave = async () => {
        try {
            const payload = {
                serial: serial,
                price: price
            }
            axios.post(`${config.apiURL}/sell/create`, payload);
            fetchSellData();
        } catch(error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot save data",
                text: error.message
            });
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const button = await Swal.fire({
                title: "Delete this record?",
                text: "Are you sure you want to delete this record?",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true
            });

            if(button.isConfirmed) {
                await axios.delete(`${config.apiURL}/sell/remove/${id}`);
                fetchSellData();
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot delete data",
                text: error.message
            });
        }
    }

    const handleConfirm = async () => {
        try {
            const button = await Swal.fire({
                title: "Confirm Order?",
                text: "Are you sure you want to confirm order?",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true
            });

            if(button.isConfirmed) {
                await axios.get(`${config.apiURL}/sell/confirm`);
                fetchSellData();
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Connnot confirm order",
                text: error.message
            });
        }
    }

    const fetchSellData = async () => {
        try {
            const response = await axios.get(`${config.apiURL}/sell/list`);
            setSellList(response.data);

            let total = 0;
            response.data.forEach((item: any) => {
                total += item.price;
            });
            settotalAmount(total);
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot fetch data",
                text: error.message
            });
         }
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

            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th className="w-[50px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {sellList.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.product.serial}</td>
                            <td>{item.product.name}</td>
                            <td className="text-right">{item.price.toLocaleString()}</td>
                            <td className="text-center">
                                <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                                    <i className="fa-solid fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {sellList.length > 0 && (
                <>
                    <div className="mt-5 flex justify-between items-center">
                        <div>Total Amount: </div>
                        <div className="text-right font-bold bg-gray-300 px-4 py-2 rounded-lg">{totalAmount.toLocaleString()}</div>
                    </div>
                    
                    <div className="mt-5 text-center">
                        <button className="btn font-bold" onClick={handleConfirm}>
                            <i className="fa-solid fa-check mr-2"></i>
                            Confirm Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}