import clientPromise from "@/db/connectDB";
import User, { IUser } from "@/db/schema/User";
import { NextRequest, NextResponse } from "next/server";

const isCronSecretValid = (request: NextRequest): boolean => {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
};

async function fetchStockPrice(LSID: string): Promise<number | null> {
  try {
    const response = await fetch(
      `https://www.ls-tc.de/_rpc/json/instrument/chart/dataForInstrument?instrumentId=${LSID}`,
      { next: { revalidate: 50 } }
    );
    if (!response.ok) {
      throw new Error("Response not ok.");
    }
    const { series } = await response.json();
    if (!series?.intraday?.data || series.intraday.data.length === 0) {
      throw new Error("Stock price data not found.");
    }
    return series.intraday.data[series.intraday.data.length - 1][1];
  } catch (e) {
    console.error(
      `Failed to fetch stock information for ${LSID}: ${(e as Error).message}`
    );
    return null;
  }
}

async function calculatePortfolio(user: IUser): Promise<void> {
  await clientPromise; // Ensure the database connection is established.

  // Use Promise.all to fetch all stock prices in parallel.
  const stockPricesPromises = user.holdings.map((holding) =>
    fetchStockPrice(holding.LSID)
  );

  const stockPrices = await Promise.all(stockPricesPromises);

  // Calculate the total portfolio value.
  let totalPortfolioValue = user.holdings.reduce((acc, holding, index) => {
    const stockPrice = stockPrices[index];
    if (stockPrice === null) return acc; // Skip if stockPrice couldn't be fetched.
    return acc + stockPrice * holding.quantity;
  }, 0);

  user.portfolioValue.push({
    date: new Date(),
    value: totalPortfolioValue + user.money,
  });

  // Use update operation directly
  await User.updateOne(
    { _id: user._id },
    { $set: { portfolioValue: user.portfolioValue } }
  );
}

export async function GET(request: NextRequest): Promise<Response> {
  if (!isCronSecretValid(request)) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    // Query users and only fetch necessary fields.
    const users = await User.find({}).select(
      "_id holdings money portfolioValue"
    );

    // Process users in parallel
    await Promise.all(
      users.map((user) => {
        if (user.holdings.length > 0) {
          return calculatePortfolio(user);
        }
        return null; // Return null for users with no holdings.
      })
    );

    return new Response("Values Updated Successfully");
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}
