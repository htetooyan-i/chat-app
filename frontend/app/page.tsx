"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
export default function Home() {
  const [ users, setUsers ] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <button
        onClick={fetchUsers}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Fetch Users
      </button>
      <ul className="mt-4">
        {users.map((user: any) => (
          <li key={user.id} className="border-b py-2">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
