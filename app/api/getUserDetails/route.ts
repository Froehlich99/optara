import connectDB from "@/db/connectDB";
import User from "@/db/schema/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const userId = req.nextUrl.searchParams.get("userId");
  await connectDB();
  try {
    const user = await User.findOne({ clerkId: userId });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Failed to fetch the user" });
  }
}
