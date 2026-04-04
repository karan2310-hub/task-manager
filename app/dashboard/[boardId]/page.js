"use client";
import {useEffect, useState} from "react";

export default function boardPage({params}){//yaha wala param nextjs khud handle kr leta ha ia

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
 const updateStatus = async (taskId, status) => {
  await fetch("/api/tasks/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ taskId, status })
  });

  //  update ke baad tasks dubara lao
  getTasks();
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

          {/* now for ui of status update */}
          <select
  value={task.status}
  onChange={(e) => updateStatus(task._id, e.target.value)}
>
  <option value="todo">Todo</option>
  <option value="in-progress">In Progress</option>
  <option value="done">Done</option>
</select>
        </div>
      ))}

    </div>
  );
}