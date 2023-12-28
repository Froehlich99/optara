import { NextApiRequest, NextApiResponse } from "next";

const STOCK_SEARCH_API_URL = "https://api.tiingo.com/tiingo/utilities/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.query as string;
  const key = process.env.TIINGO_API_KEY;

  const response = await fetch(
    `${STOCK_SEARCH_API_URL}?query=${query}&token=${key}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return res.status(500).json({
      error: "An error occurred while fetching the data from Tiingo API.",
    });
  }

  const data = await response.json();
  return res.status(200).json(data);
}
