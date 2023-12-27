const STOCK_SEARCH_API_URL = "https://www.alphavantage.co/query?";

export async function searchStock(query: string) {
  const response = await fetch(
    `${STOCK_SEARCH_API_URL}function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  const data = await response.json();
  return data;
}
