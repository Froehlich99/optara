"use server";

export async function getStocks(query: string) {
  const STOCK_SEARCH_API_URL = "https://api.tiingo.com/tiingo/utilities/search";
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

  const data = await response.json();
  return data;
}
