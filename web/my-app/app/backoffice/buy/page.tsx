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
    const [products, setProducts] = useState([]); // products bought: array
    const [id, setId] = useState(0); // product id, use in editing/deleting records in the database
    const [qty, setQty] = useState(1); // quantity

    useEffect(() => {
        fetchProductsBought();
    }, []);

    const fetchProductsBought = async () => {
        try {
            const response = await axios.get(`${config.apiURL}/buy/list`);
            setProducts(response.data);
        } catch(err: any) {
            Swal.fire({
                icon: "error",
                title: "Error fetching products!",
                text: err.message
            });
        }
    }

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
                remark: remark,
                qty: qty
            }

            if(id === 0) { // id == 0, create
                await axios.post(`${config.apiURL}/buy/create`, payload);
            } else { // id != 0, edit
                await axios.put(`${config.apiURL}/buy/update/${id}`, payload);
            }

            Swal.fire({
                icon: "success",
                title: "Saved!",
                text: "Your data is saved!",
                timer: 2000
            });

            handleCloseModal();
            fetchProductsBought();

        } catch(err) {
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Cannot save data"
            });
        }
    }

    const handleEdit = (id: number) => {
        const product = products.find((product: any) => product.id === id) as any;

        setId(product.id);
        setSerial(product.serial);
        setName(product.name);
        setRelease(product.release);
        setColor(product.color);
        setPrice(product.price);
        setCustomerName(product.customerName);
        setCustomerPhone(product.customerPhone);
        setCustomerAddress(product.customerAddress);
        setRemark(product.remark);
        setQty(1);

        handleOpenModal();
    }

    const handleDelete = async (id: number) => {
        const product = products.find((product: any) => product.id === id) as any;
        
        try {
            const button = await Swal.fire({
                title: "Are you sure you want to delete this data?",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true
            });

            if(button.isConfirmed) {
                await axios.delete(`${config.apiURL}/buy/remove/${id}`);

                fetchProductsBought();
            }

        } catch(err: any) {
            Swal.fire({
                icon: "error",
                title: "Error trying to delete data!",
                text: err.message
            });
        }
    }

    const handleClear = () => {
        setSerial("");
        setName("");
        setRelease("");
        setColor("");
        setPrice(0);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
        setRemark("");
        setQty(1);
    }

    return (
        <>

            <h1 className="content-header">รายการซื้อ</h1>

            <div>
                <button className="btn" onClick={() => {
                    handleClear();
                    handleOpenModal();
                }}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    เพิ่มรายการ
                </button>

                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Product Name</th>
                            <th>Release Date</th>
                            <th>Color</th>
                            <th>Price</th>
                            <th>Customer Name</th>
                            <th>Customer Phone</th>
                            <th>Customer Address</th>
                            <th>Remark</th>
                            <th className="w-[100px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => (
                            <tr key={product.id}>
                                <td>{product.serial}</td>
                                <td>{product.name}</td>
                                <td>{product.release}</td>
                                <td>{product.color}</td>
                                <td>{product.price}</td>
                                <td>{product.customerName}</td>
                                <td>{product.customerPhone}</td>
                                <td>{product.customerAddress}</td>
                                <td>{product.remark}</td>
                                <td className="text-center flex">
                                    <button className="btn-edit mr-1" onClick={() => handleEdit(product.id)}>
                                        <i className="fa-solid fa-edit"></i>
                                    </button>
                                    <button className="btn-delete mr-1" onClick={() => handleDelete(product.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                <div>Quantity: </div>
                <input type="text" value={qty} onChange={(e) => setQty(Number(e.target.value) ?? 0)} />

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