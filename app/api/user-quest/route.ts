import clientPromise from "@/db/connectDB";
import User from "@/db/schema/User";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  await clientPromise;
  console.log("somehow get here?");
  const data = await req.json();
  const { clerkId, quests } = data;

  const filter = {
    clerkId: clerkId,
    quests: {
      $not: {
        $elemMatch: {
          name: {
            $in: quests.map(
              (quest: {
                name: string;
                rewardPoints: number;
                completion: number;
              }) => quest.name
            ),
          },
        },
      },
    },
  };
  const update = { $addToSet: { quests: { $each: quests } } };

  try {
    const response = await User.updateOne(filter, update, { upsert: true });

    return NextResponse.json({ message: "Woho 🎉", response, quests });
  } catch (err: any) {
    if (err.code !== 11000) {
      return NextResponse.json({ message: err.message });
    }
    return NextResponse.json({ message: "succ" });
  }
}

//Old, this creates new quest

// export async function POST(req: any, res: any) {

//   const data = await req.json();
//   const { clerkId, quest } = data;

//   const filter = { clerkId: clerkId }
//   const update = { $push: { quests: quest } };

//   try {
//     const response = await User.findOneAndUpdate(filter, update , { new: true });

//     return NextResponse.json({ message: "Woho 🎉", response, quest });
//   } catch (err: any) {
//     return NextResponse.json({ message: err.message });
//   }
// }
