// import User, { IUser } from "@/db/schema/User";

// export async function updateUserDetails(userId: string, newUsername: string): Promise<IUser | null> {
//     try {
//       const user: IUser | null = await User.findOneAndUpdate(
//         { clerkId: userId },
//         { username: newUsername },
//         { new: true } // This option ensures the updated document is returned
//       );
//       return user;
//     } catch {
//       return null;
//     }
//   }