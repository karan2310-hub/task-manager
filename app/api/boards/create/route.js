import{connectDB} from "@/lib/db";
import Board from "@/models/Board";
import {verifyToken} from "@lib/auth";

export async function POST(req){
    await connectDB();

    const user=verifyToken(req);//fe se api hit krke jo bheja tha wo hai inn req mai....
    
    if(!user) return Response.json({message:"unauthorized you are"},{status:401})

    const {title,description}= await req.json();

    const board= await Board.create({
        title,
        description,
        owner:user.id,
        member: [user.id] //owner bhi member hoga hi.. and etc jinko add krna ho
    });

    return Response.json(board);
    //fe jo krega const rea=await(api)  to res mai ye board milega use...
}