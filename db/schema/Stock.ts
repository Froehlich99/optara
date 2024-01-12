import mongoose, { Document, Schema } from "mongoose";

export interface IStock extends Document {
  WKN: number;
  Company: string;
  LSID: number;
  ISIN: string;
  Ticker: string;
}

const StockSchema = new Schema<IStock>({
  WKN: { type: Number, required: true },
  Company: { type: String, required: true },
  LSID: { type: Number, required: true },
  ISIN: { type: String, required: true },
  Ticker: { type: String, required: true },
});

export default mongoose.models.Stock ||
  mongoose.model<IStock>("Stock", StockSchema);
