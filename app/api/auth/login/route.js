import {connectDB} from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";//user login->har session ke liye ek token diya usko 

export async function POST(req){
    await connectDB();

    const {email, password}=await req.json();
  //user ne email pass dal diye-> check db mai aisa koi user hai ? -> email yes pass wrong, say: incorrect pass
  const user=await User.findOne({email});

  if(!user){
    return Response.json({message:"user not found"},{status:400});
  }


  //pass match krege ab, if user hai us email ka
  //-> pehle pass ko bcrrpy kr lena, as pehle humne hash form me kr diya tha signup smy

  const ismatch= await bcrypt.compare(password,user.password);

  if(!ismatch){
    return Response.json({message:"user cred don't match"},{status:400});
  }

//   chlo pass match kr gya-> ab seesion banake token do and login kr do

  const token= jwt.sign ({id:user._id},"secret",{expiresIn:"1d"});
  
  return Response.json({token});
}
