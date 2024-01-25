import { NextRequest } from "next/server";
import User from "@/db/schema/User";

// This export ensures dynamic edge runtime, as it prevents static optimization.
export const dynamic = "force-dynamic";

// Define a type for the leaderboard entry returned by the aggregation pipeline.
interface LeaderboardEntry {
  username: string;
  latestPortfolioValue: number;
}

// Define a type for the cache object.
interface Cache<T> {
  data: T | null;
  expiry: number;
}

// Create a cache specifically for LeaderboardEntry arrays.
let topUsersCache: Cache<LeaderboardEntry[]> = {
  data: null,
  expiry: Date.now() + 60000, // 60 seconds from now
};

export async function GET(_request: NextRequest): Promise<Response> {
  try {
    // Check if the cache is valid and use it if it is.
    if (topUsersCache.data && topUsersCache.expiry > Date.now()) {
      return new Response(JSON.stringify(topUsersCache.data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Perform the aggregation if the cache has expired or is empty.
    const topUsers: LeaderboardEntry[] = await User.aggregate([
      {
        $project: {
          username: 1,
          latestPortfolioValue: { $arrayElemAt: ["$portfolioValue", -1] },
        },
      },
      {
        $addFields: {
          latestPortfolioValue: "$latestPortfolioValue.value",
        },
      },
      {
        $sort: { latestPortfolioValue: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          username: 1,
          latestPortfolioValue: 1,
        },
      },
    ]).exec();

    // Update the cache with the new data and set the expiry time to 60 seconds from now.
    topUsersCache = {
      data: topUsers,
      expiry: Date.now() + 60000,
    };

    // Return the new data as the response.
    return new Response(JSON.stringify(topUsers), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // If an error occurs, respond with the error message and a 500 status code.
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error(err);
    return new Response(message, { status: 500 });
  }
}
