"use client";
import {useEffect, useState} from "react";

export default function boardPage({params}){
 const[tasks,setTasks]=useState([]);
 const token =localStorage.getItem("token");
 const boardId=params.boardId();

 //fetchi from be
 const fetch_task=async()=>{
    const res=await fetch(`/api/task/get?boardId=${boardId}`,{
        headers:{
            Authorization:`Bearer${token}`
        }
    });
    const data = await res.json();
    setTasks(data);
 };

 useEffect(()=>{
    getTasks();
 },[]);

 return (
    <div>
      <h1>Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id}>
          <p>{task.title}</p>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
}