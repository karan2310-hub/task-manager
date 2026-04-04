import { connectDB } from "@/lib/db";
import task from "@/models/task";
import Board from "@/models/Board";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

//aab verify kro user ko
const user=verifyToken(req);
if(!user) return Response.json({ msg: "Unauthorized" }, { status: 401 });

//KIS TASK KA AND KYA UPDATE WO LELO FE SE
const{taskId,status}=await req.json();

//taskid se wo task leke ao
const Task=await task.findById(taskId);
if(!Task) ({ message: "Unauthorized" }, { status: 401 });

  // find board, iss Task mai board se boardId hogi
  const board = await Board.findById(Task.board);

  //aab seeing ki iss board ke liye humara user authorised hai ya nhi 
  if (!board.members.includes(user.id)) {
    return Response.json({ message: "Access denied" }, { status: 403 });
  }

  //updation start
  Task.status=status;

  //aab activity og mai dal rahe hain 
  Task.activity.push({
    user:user.id,
    action:`changed status to ${status}`
  });

await Task.save();

  return Response.json(Task);
}