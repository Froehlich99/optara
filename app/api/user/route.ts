import connectDB from "@/db/connectDB";
import User from "@/db/schema/User";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  await connectDB();

  const { clerkId, username } = req.body;

  try {
    let user = await User.findOne({ clerkId });
    console.log(user);
    if (!user) {
      // Create a new user if it does not exist
      user = new User({ clerkId: clerkId, username: username });
      console.log(user);
    }

    await user.save();
    return NextResponse.json({ message: "Woho 🎉" });
  } catch (err) {
    return NextResponse.json({ message: "Rip 💀" });
  }
}
