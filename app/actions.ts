"use server";

import { getStocks } from "@/app/lib/getStocks";

export async function getStock(query: string) {
  const stocks = await getStocks(query);
  if (stocks && stocks.length) {
    const data = stocks.map((stock) => JSON.parse(JSON.stringify(stock)));
    return data;
  }
  return null;
}
