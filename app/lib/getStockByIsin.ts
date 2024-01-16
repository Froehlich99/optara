import connectDB from "@/db/connectDB";
import Stock, { IStock } from "@/db/schema/Stock";

export async function getStockByIsin(isin: string): Promise<IStock | null> {
  await connectDB();
  try {
    const stock = await Stock.findOne({ ISIN: isin });
    return stock.toObject();
  } catch (err) {
    return null;
  }
}
