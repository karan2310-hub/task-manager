//tasks get krne hai..

import {connectDB} from "@/lib/db";
import task from "@/models/task";//task schema se connect
import Board from "@/models/Board";
import { verifyToken } from "@/lib/auth";

export async function GET(req){
await connectDB();

const user=verifyToken(req);

if(!user) return Response.json({message:"anauthorized"},{status:401});

//aab boardId lenge url se
const {searchParams}=new URL(req.url);
const boardId=searchParams.get("boardId");

//aab check ais aboard h bhi ya nhi 
const board=await Board.findById(boardId);
if(!board) return Response.json({message:"board not found"},{status:404});

//aab access check, ki user iss board ko access kr skta hai ya nhi 
if(!board.members.includes(user.id)){
    return Response.json({msg:"access denied"},{status:403});
}

//sab gone well, so now fetching task
const tasks=await task.find({board:boardId});
return Response.json(tasks);
}
