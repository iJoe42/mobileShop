"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import { useState, useEffect } from "react";
import Modal from "@/app/backoffice/modal";

export default function SideBar() {

    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const [isOpen, setIsOpen] = useState(false); // isOpen for Modal component
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const router = useRouter();

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const fetchUserInfo = async () => {
        const token = localStorage.getItem("token");
        const headers = {
            "Authorization": `Bearer ${token}`
        }
        const res = await axios.get(`${config.apiURL}/user/info`, {headers: headers});

        setName(res.data.name);
        setUsername(res.data.username);
        setLevel(res.data.level);
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    }

    const handleSave = async () => {

        // validate matching password
        if(password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Passwords do not match",
                text: "Please confirm your password again"
            });
            return;
        } else {
            const payload = {
                name: name,
                username: username,
                password: password,
                level: level
            }

            // token and header to identify user
            const token = localStorage.getItem("token");
            const headers = {
                "Authorization": `Bearer ${token}`
            }

            await axios.put(`${config.apiURL}/user/update`, payload, {headers: headers});

            fetchUserInfo();
            handleCloseModal();
        }
    }

    return(
        <div className="bg-teal-400 h-screen w-64">
            <div className="p-5 bg-teal-700 text-white font-bold">
                <h1>Next Mobile Shop 1.0</h1>
                <div className="flex items-center gap-2 mt-3">
                    <i className="fa fa-user"></i>
                    <span className="w-full">{name} : {level}</span>
                    <button className="bg-blue-500 rounded-full px-2 py-1" onClick={handleOpenModal}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="bg-red-500 rounded-full px-2 py-1" onClick={handleLogout}>
                        <i className="fa fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
            <div className="p-5 text-white text-xl flex flex-col gap-2">

                <div className="flex">
                    <Link href="/backoffice/dashboard">
                        <i className="fa fa-tachometer-alt mr-2 w-[25px] text-center"></i>
                        Dashboard
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/buy">
                        <i className="fa fa-shopping-cart mr-2 w-[25px] text-center"></i>
                        ซื้อสินค้า
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/sell">
                        <i className="fa fa-dollar-sign mr-2 w-[25px] text-center"></i>
                        ขายสินค้า
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/repair">
                        <i className="fa fa-wrench mr-2 w-[25px] text-center"></i>
                        รับซ่อม
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/company">
                        <i className="fa fa-building mr-2 w-[25px] text-center"></i>
                        ข้อมูลร้าน
                    </Link>
                </div>

                <div>
                    <Link href="/backoffice/user">
                        <i className="fa fa-user mr-2 w-[25px] text-center"></i>
                        ผู้ใช้งาน
                    </Link>
                </div>

            </div>

            <Modal title="Edit user info" isOpen={isOpen} onClose={handleCloseModal}>
                <div>
                    <div>Name: </div>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value)}} className="form-control" />

                    <div className="mt-3">Username: </div>
                    <input type="text" value={username} onChange={(e) => { setUsername(e.target.value)}} className="form-control" />

                    <div className="mt-3">Password: </div>
                    <input type="text" onChange={(e) => { setPassword(e.target.value)}} className="form-control" />

                    <div className="mt-3">Confirm password: </div>
                    <input type="text" onChange={(e) => { setconfirmPassword(e.target.value)}} className="form-control" />

                    <div className="mt-3">
                        <button className="btn" onClick={handleSave}> 
                            <i className="fa fa-save mr-2"></i>
                            Save
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}