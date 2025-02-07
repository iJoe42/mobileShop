"use client";

import { useState } from "react";
import { config } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSignin = async () => {
        try {
            const payload = {
                username: username,
                password: password
            }

            const response = await axios.post(`${config.apiURL}/user/signin`, payload);

            if(response.data.token !== null) {
                localStorage.setItem("token", response.data.token);
                router.push("/backoffice/dashboard");
            } else {
                Swal.fire({
                    title: "Error logging in!",
                    text: "Invalid username or password.",
                    icon: "warning",
                    timer: 2000
                });
            }

        } catch(error: any) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1 className="text-2xl font-bold">Sign In</h1>

                <div className="mt-4 font-semibold">Username</div>
                <input type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}></input>

                <div className="mt-4 font-semibold">Password</div>
                <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>

                <button className="mt-4 font-semibold" onClick={handleSignin}>
                    Sign In
                    <i className="fa fa-sign-in-alt ml-3"></i>
                </button>

            </div>
        </div>
    );
}