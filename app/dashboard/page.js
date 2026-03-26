// ye hai apna, ui for creating board

"use client";
import{useState, useEffect} from "react";

export default function Dashboard(){
    const[title,setTitle]=useState("");
    const[boards,setBoards]=useState([]);

    const token=localStorage.getItem("token");//taki board create ya get mai ye bhejke authorize kar sake


    const  createBoard=async()=>{
       await fetch("/api/boards/create",{
        method:"POST",
        header:{
            "Content-Type":"application/json",
            Authorization:`Bearer${token}`
        },
        boody:JSON.stringify({title})
       });
     getBoards();
    };
    const getBoards=async()=>{
     const res=await fetch("/api/boards/get",{
        headers:{//method nhi diya, matlab ki get
            Authorization:`Bearer ${token}`
        }
         });
         const data= await res.json();
        setBoards(data);
    };

    useEffect(()=>{
        getBoards();
    },[]);

    return(
        <div classname="first">
            <p>DASHBOARD</p>
            <input
            placeholder="board title"
            onchange={()=>setTitle(e.target.value)}
            />
            <button onClick={createBoard}>CREATE BOard</button>
           <div>
            {boards.map((b)=>{
                <p key={b._id}>{b.title}</p>
            })}
           </div>
        </div>
    );



}
