"use client";

import { useState } from "react";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1 className="text-2xl font-bold">Sign In</h1>

                <div className="mt-4 font-semibold">Username</div>
                <input type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}></input>

                <div className="mt-4 font-semibold">Password</div>
                <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>

                <button className="mt-4 font-semibold" type="submit">Sign In</button>

            </div>
        </div>
    );
}