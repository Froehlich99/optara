import Stock, { IStock } from "@/db/schema/Stock";

export async function getStocks(query: string): Promise<IStock[] | null> {
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
    return stocks;
  } catch (err) {
    return null;
  }
}
