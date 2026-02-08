"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
export default function Home() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const registerUser = async () => {
    try {
      const responnse = await axios.post("http://localhost:4000/api/auth/register", {
        email,
        username,
        password,
      });
      console.log(responnse.data);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      const accessToken = response.data.accessToken;
      fetchUser(accessToken);
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  const fetchUser = async (accessToken: string) => {

    try {
      const response = await axios.get("http://localhost:4000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <div>
        {/* <input className="border border-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border border-black" type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input className="border border-black" type="password" name="pasword" id="" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="button" onClick={registerUser}>Register</button> */}

        <h1 className="text-3xl font-bold underline">Login</h1>
        <div>
          <input className="border border-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="border border-black" type="password" name="pasword" id="" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="button" onClick={loginUser}>Login</button>
        </div>

    </div>

  );
}
