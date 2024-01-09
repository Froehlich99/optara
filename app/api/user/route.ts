import connectDB from "@/db/connectDB";
import User from "@/db/schema/User";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  await connectDB();
  const data = await req.json();
  const { clerkId, username } = data;

  try {
    let user = await User.findOne({ clerkId });
    if (!user) {
      await User.create({ clerkId, username });
    }
    return NextResponse.json({ message: "Woho 🎉" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
