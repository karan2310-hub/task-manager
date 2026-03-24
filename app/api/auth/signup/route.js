//signup? so db connectka jarurt prega
import connectDB from "@/lib/db";

//schema v leliya, data rkhnew ka format
import User from "@/models/user.js";

import bcrypt from "bcrypt.js";

export async function POST(req){//fe pe  await fetch(....) 
    // isme method=post tab ye api call hua hoga...
    //fe pe input liya hoga then await fetch(api) isme body.jsonstringfy se bheja yhan backend pe




    //kuch dena hai ya bhejna hai maybe data or passwrd etc
    await connectDB(); //db ke connect ka wait kro 

    const {name, email, passwrod}= await req.json();
    // //or
    //   const data = await req.json();
    //   const name= data.name*******************************************
    //   const email
    //   const pass


    const hashed= await bcrypt.hash(passsword,10);
    //name email and password ko input karay for signup-> and pass ko hash kr diya 

    const user = await User.create({
        name,
        email,
        password:hashed,

    });
    return Response.json(user);// fe pe const res=await fetch() kiya tha aab yhi response jo gaya waha res mai storehua hoga...
    
}
