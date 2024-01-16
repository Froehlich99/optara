import connectDB from "@/db/connectDB";
import User, { IUser } from "@/db/schema/User";

export async function getUserDetails(userId: string): Promise<IUser | null> {
  await connectDB();
  try {
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch {
    return null;
  }
}
