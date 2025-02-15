"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "@/app/config";
import Swal from "sweetalert2";
import Modal from "../modal";
import dayjs from "dayjs";

export default function Page() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [remark, setRemark] = useState("");
    const [id, setId] = useState("");
    const [repairs, setRepairs] = useState([]);

    useEffect(() => {
        fetchRepairData();
    }, []);

    const fetchRepairData = async () => {
        try {
            const res = await axios.get(`${config.apiURL}/service/list`);
            setRepairs(res.data);
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot fetch repair data",
                text: error.message
            });
        }
    }

    const handleOpenModal = () => {
        setIsShowModal(true);
    }

    const handleCloseModal = () => {
        setIsShowModal(false);
    }

    const handleSave = async () => {
        try {
            const payload = {
                name: name,
                price: price,
                remark: remark
            }

            if(id !== "") {
                await axios.put(`${config.apiURL}/service/update/${id}`, payload)
                setId("");
            } else {
                await axios.post(`${config.apiURL}/service/create`, payload);
            }

            handleClearForm();
            handleCloseModal();
            fetchRepairData();
            
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot save service data",
                text: error.message
            });
        }
    }

    const handleClearForm = () => {
        setName("");
        setPrice(0);
        setRemark("");
    }

    const handleDelete = async (id: number) => {
        try {
            const button = await Swal.fire({
                icon: "question",
                title: "Are you sure you want to delete this service?",
                showCancelButton: true,
                showConfirmButton: true
            });

            if(button.isConfirmed) {
                await axios.delete(`${config.apiURL}/service/remove/${id}`);
                fetchRepairData();
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot delete service",
                text: error.message
            });
        }
    }

    const handleEdit = async (id: number) => {
        const repair = repairs.find((repair: any) => repair.id === id) as any;

        if(repair) {
            setId(repair.id);
            setName(repair.name);
            setPrice(repair.price);
            setRemark(repair.remark);
            handleOpenModal();
        }
    }

    return (
        <div>

            <h1 className="content-header">งานบริการ</h1>
            <div>
                <button className="btn font-bold" onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    Save
                </button>

                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th className="text-center">ชื่องานบริการ</th>
                            <th className="text-center">ราคา</th>
                            <th className="text-center">หมายเหตุ</th>
                            <th className="text-center">วันที่บันทึก</th>
                            <th className="w-[60px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { repairs && repairs.map((repair: any) => (
                            <tr key={repair.id}>
                                <td>{repair.name}</td>
                                <td className="text-right">{repair.price.toLocaleString()}</td>
                                <td>{repair.remark}</td>
                                <td>{dayjs(repair.payDate).format("DD/MM/YYYY")}</td>
                                <td className="text-center flex gap-1">
                                    <button className="btn-edit" onClick={() => handleEdit(repair.id)}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(repair.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isShowModal} title="บันทึกงานบริการ" onClose={handleCloseModal} >
                <div>
                    <div>ชื่องานบริการ</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <div className="mt-4">ราคา</div>
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />

                    <div className="mt-4">หมายเหตุ</div>
                    <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />

                </div>

                <button className="btn mt-4 font-bold" onClick={handleSave}>
                        <i className="fa-solid fa-save mr-2"></i>
                        Save
                </button>
            </Modal>

        </div>
    );
}