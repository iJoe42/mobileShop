"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "@/app/config";
import Swal from "sweetalert2";
import Modal from "@/app/backoffice/modal";

export default function Page() {
    const [users, setUsers] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
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

    const handleSave = async () => {
        try {
            if(password !== passwordConfirm){
                Swal.fire({
                    icon: "error",
                    title: "Error! Passwords do not match",
                    text: "Please make sure passwords are match and try again!"
                });
            }

            const payload = {
                name: name,
                username: username,
                password: password,
                level: level
            }

            if(id === "") {
                await axios.post(`${config.apiURL}/user/create`, payload);
            } else {
                await axios.put(`${config.apiURL}/user/update/${id}`, payload);
                setId("");
            }
            
            fetchUserData();
            handleCloseModal();

        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Failed to add new user",
                text: error.message
            });
        }
    }

    const handleEdit = (id: String) => {
        const user = users.find((user: any) => user.id === id) as any;

        setId(user.id);
        setName(user.name);
        setUsername(user.username);
        setLevel(user.level);
        setIsShowModal(true);
    }

    const handleDelete = async (id: String) => {
        try {
            const button = await Swal.fire({
                title: "Are you sure you want to delete this user?",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true
            });

            if(button.isConfirmed) {
                await axios.delete(`${config.apiURL}/user/remove/${id}`);
                fetchUserData();
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error! Failed to delete user",
                text: error.message
            });
        }
    }

    return (
        <>
            <h1 className="content-header">Users</h1>
            <div>
                <button className="btn font-bold" onClick={handleOpenModal}>
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
                                    <button className="btn-edit" onClick={() => handleEdit(user.id)}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(user.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal title="Add User" isOpen={isShowModal} onClose={handleCloseModal}>
                    <div>
                        <div>Name</div>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mt-3">
                        <div>Username</div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="mt-3">
                        <div>Password</div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="mt-3">
                        <div>Confirm Password</div>
                        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>

                    <div className="mt-3">
                        <div>User's Role</div>
                        <select className="form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
                            {levelList.map((item: any) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button className="btn mt-3 font-bold" onClick={handleSave}>
                            <i className="fa-solid fa-save mr-2"></i>
                            Add User
                        </button>
                    </div>
                </Modal>

            </div>
        </>
    );
}