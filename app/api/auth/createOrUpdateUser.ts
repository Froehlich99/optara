import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import connectDB from "@/db/connectDB";
import User from "@/db/schema/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "POST") {
    const { clerkId, username } = req.body;

    try {
      let user = await User.findOne({ clerkId });

      if (!user) {
        // Create a new user if it does not exist
        user = new User({ clerkId: clerkId, username: username });
      }

      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
