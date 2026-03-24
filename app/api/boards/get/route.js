import { connectDB } from "@/lib/db";
import Board from "@/models/Board";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  await connectDB();

  const user = verifyToken(req);

  if (!user) {
    return Response.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const boards = await Board.find({
    members: user.id//user id dala to member ka sara dtails aagya hoga shayad

    // sirf wahi boards milenge jisme user member hai
  });

  return Response.json(boards);
}