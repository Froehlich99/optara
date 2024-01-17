"use server";

import clientPromise from "@/db/connectDB";
import Stock, { IStock } from "@/db/schema/Stock";
import User from "@/db/schema/User";
import { auth } from "@clerk/nextjs";

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
    { cache: "no-cache" }
  );

  if (!response.ok) {
    console.error("HTTP error", response.status);
    return null;
  } else {
    const priceData = await response.json();
    return priceData;
  }
}
