import User, { IUser } from "@/db/schema/User";

export async function getUserDetails(userId: string): Promise<IUser | null> {
  try {
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch {
    return null;
  }
}
