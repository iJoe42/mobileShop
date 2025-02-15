"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "@/app/config";
import Swal from "sweetalert2";

export default function Page() {
    const [users, setUsers] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("user");
    const [levelList, setLevelList] = useState(["admin", "user"]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${config.apiURL}/user/list`);
            setUsers(response.data);
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Cannot fetch users data",
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

    return (
        <>
            <h1 className="content-header">Users</h1>
            <div>
                <button className="btn font-bold">
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add User
                </button>

                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Username</th>
                            <th className="text-center">Level</th>
                            <th className="text-center w-[100px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.level}</td>
                                <td className="text-center flex gap-1">
                                    <button className="btn-edit">
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button className="btn-delete">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}