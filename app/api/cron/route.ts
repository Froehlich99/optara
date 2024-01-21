import clientPromise from "@/db/connectDB";
import User, { IUser } from "@/db/schema/User";
import type { NextRequest } from "next/server";

async function calculatePortfolio(user: IUser) {
  await clientPromise;
  let totalPortfolioValue = 0;

  for (const holding of user.holdings) {
    const response = await fetch(
      `https://www.ls-tc.de/_rpc/json/instrument/chart/dataForInstrument?instrumentId=${holding.LSID}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch stock information for ${holding.LSID}`);
    }

    const { series } = await response.json();
    const stockPrice = series?.intraday?.data[0][1];
    if (!stockPrice)
      throw new Error(`Couldn't find stock price for ${holding.LSID}`);

    totalPortfolioValue += stockPrice * holding.quantity;
  }

  user.portfolioValue.push({
    date: new Date(),
    value: totalPortfolioValue,
  });

  // Build the updated User object
  const updatedUser = new User(user);

  // Save the updated User to the database
  await updatedUser.save();
}

export async function GET(request: NextRequest) {
  try {
    // Find all users
    const users = await User.find({});
    // Iterate over each user, fetch their stocks, and calculate their portfolio value
    for (const user of users) {
      if (user.holdings.length > 0) {
        await calculatePortfolio(user);
      }
    }
    // Send back a success response
    return new Response("Values Updated Successfully");
  } catch (err: any) {
    // Return the error to the client
    return new Response(err.message);
  }
}
