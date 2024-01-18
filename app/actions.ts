"use server";

import clientPromise from "@/db/connectDB";
import Stock, { IStock } from "@/db/schema/Stock";
import User from "@/db/schema/User";
import { auth } from "@clerk/nextjs";
import { IUser } from "@/db/schema/User";
import { IQuest } from "@/constants/types";

export async function loadQuests(quests: Array<IQuest>) {
  await clientPromise;

  const user: IUser | null = await getUser();

  const clerkId = user?.clerkId;
  // console.log(user)
  try {
    // Find the user by clerkId
    const user = await User.findOne({ clerkId: clerkId });
  
    if (user) {
      // Filter out quests that are already assigned to the user
      const newQuests = quests.filter((questToAdd) =>
        !user.quests.some((existingQuest: IQuest) => existingQuest.name === questToAdd.name)
      );
  
      // If there are new quests to add, update the user's quests
      if (newQuests.length > 0) {
        const response = await User.updateOne(
          { _id: user._id },
          { $addToSet: { quests: { $each: newQuests } } }
        );
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  // const filter = {
  //   clerkId: clerkId,
  //   quests: {
  //     $not: {
  //       $elemMatch: {
  //         name: { $in: quests.map((quest:{
  //           name: string;
  //           rewardPoints: number;
  //           completion: number;
  //         }) => quest.name) }
  //       }
  //     }
  //   }
  // };
  // const update = { $addToSet: { quests: { $each: quests } } };

  // try {
  //   const response = await User.updateOne(filter, update, {upsert: true});
  //   console.log("Yay")
  //   return true
  // } catch (err: any) {
  //   console.log(err)
  //   return false
  // }
  //API CALL, above tries to connect to database directly
  // fetch("/api/user-quest", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ clerkId: user ? user.clerkId : '', quests: quests }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data)
  //     // Handle post request success
  //   })
  //   .catch((error) => {
  //     // Handle post request error
  //   });
}

export async function getStocks(query: string): Promise<IStock[] | null> {
  await clientPromise;
  try {
    const pipeline = [
      {
        $search: {
          index: "stockSearch",
          autocomplete: {
            query: query,
            path: "Company",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      { $limit: 10 },
    ];
    const stocks = await Stock.aggregate(pipeline);
    if (stocks && stocks.length) {
      const data = stocks.map((stock) => JSON.parse(JSON.stringify(stock)));
      return data;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function getUser() {
  await clientPromise;
  const { userId }: { userId: string | null } = auth();
  const userData = await User.findOne({ clerkId: userId });
  return userData;
}

export async function getStockByIsin(isin: string): Promise<IStock | null> {
  await clientPromise;
  try {
    const stock = await Stock.findOne({ ISIN: isin });
    if (stock) {
      const plainObject = stock.toObject();
      plainObject._id = plainObject._id.toString();
      return plainObject;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function getStockPricing(lsid: string | undefined) {
  await clientPromise;
  if (!lsid) {
    return;
  }
  const response = await fetch(
    `https://www.ls-tc.de/_rpc/json/instrument/chart/dataForInstrument?instrumentId=${lsid}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    console.error("HTTP error", response.status);
    return null;
  } else {
    const priceData = await response.json();
    return priceData;
  }
}
