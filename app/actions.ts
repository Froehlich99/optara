"use server";

import connectDB from "@/db/connectDB";
import User from "@/db/schema/User";
import { getStocks } from "@/lib/getStocks";
import { auth } from "@clerk/nextjs";

export async function getStock(query: string) {
  const stocks = await getStocks(query);
  if (stocks && stocks.length) {
    const data = stocks.map((stock) => JSON.parse(JSON.stringify(stock)));
    return data;
  }
  return null;
}

export async function getUser() {
  await connectDB();
  const { userId }: { userId: string | null } = auth();
  const userData = await User.findOne({ clerkId: userId });
  return userData;
}
