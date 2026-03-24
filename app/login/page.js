//login ka ui/fe
"use client";
import {useState} from "react";

export default function login(){
   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
   
   const login_now= async()=>{
    const res=await fetch("/api/auth/login",{
        method:"POST",
        body: JSON.strigify({email,password})

    })
    const data= await res.json;
    console.log(data);
   }
   return(
      <div classname="loginpage">
        <input placeholder="email" onchange={(e)=>setEmail(e.taget.value)} />
        <input placeholder="pass" type="password" onchange={(e)=> setPassword(e.target.value)}/>
        <button onClick={login_now}>Login</button>
      </div>
   )
}