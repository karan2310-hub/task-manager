"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [boards, setBoards] = useState([]);

  const router = useRouter();
  const token = localStorage.getItem("token");

  const createBoard = async () => {
    await fetch("/api/boards/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    getBoards();
  };

  const getBoards = async () => {
    const res = await fetch("/api/boards/get", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setBoards(data);
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div className="first">
      <p>DASHBOARD</p>

      <input
        placeholder="board title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createBoard}>CREATE BOARD</button>

      <div>
        {boards.map((b) => (
            
          <Link key={b._id} href={`/dashboard/${b._id}`}>
    <div style={{ cursor: "pointer" }}>
      {b.title}
    </div>
  </Link>
        ))}
      </div>
    </div>
  );
}