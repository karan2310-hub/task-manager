import {connectDB} from "@/lib/db";
import task from "@/models/task";
import Board from "@/models/Board";
import {verifyToken} from "@/lib/auth";

export async function POST(req){
    await connectDB();

    //aab authorization ->session active hai ya nahi
    const user=verifyToken(req);
    if(!user){
        return Response.json({message:"unauthorized access"},{status:401});

    }

    //agr user hai to fe mai input pe likha data lao
    const {title, description, boardId} =await req.json();

    //upr aye boardId ko databse Board se check kiya 
    //bas boardId se isiliye to udhr save kiya tha ki taki, 
    //-> jab jrurt ho id dalne se poora dat le ske db se
        const board=await Board.findById(boardId);
    //aab seeing ki ye board hai bhi ki nhi jo fe se aya hai
     if(!board){
        return Response.json({ msg: "Board not found" }, { status: 404 });
     }


    //  board ke db mai, members and owner ka banay tha na
     if(!board.members.includes(user.id)){
        return Response.json({message:"access denied"},{status:403});
     }

//AS AB TAK SB OK, TO CREATE TASK
const newTask=await task.create({
    title,
    description,
    board:boardId,
    assignedto:user.id,

})
newTask.activity.push({
    user:user.Id,//token walle se aya ye,..
    //see line 10
    action:"created task"
})
await newTask.save
}