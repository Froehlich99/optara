import { NextRequest } from "next/server";
import User, { IUser, IPortfolioEntry } from "@/db/schema/User";

export async function GET(_request: NextRequest) {
  try {
    const topUsers = await User.aggregate([
      {
        $addFields: {
          latestPortfolioValue: {
            $let: {
              vars: {
                lastPortfolioEntry: { $arrayElemAt: ["$portfolioValue", -1] },
              },
              in: "$$lastPortfolioEntry.value",
            },
          },
        },
      },
      { $sort: { latestPortfolioValue: -1 } },
      { $limit: 10 },
      { $project: { username: 1, latestPortfolioValue: 1 } },
    ]);

    return new Response(JSON.stringify(topUsers));
  } catch (err: any) {
    return new Response(err.message);
  }
}
