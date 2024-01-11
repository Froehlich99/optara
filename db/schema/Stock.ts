import mongoose from "mongoose";

export interface IStock extends Document {
  name: string;
  symbol: string;
  currentPrice: number;
  historicData: Array<{ date: Date; price: number }>;
}

const StockSchema = new mongoose.Schema<IStock>(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true, unique: true },
    currentPrice: { type: Number, required: true },
    historicData: [
      {
        date: { type: Date, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Stock ||
  mongoose.model<IStock>("Stock", StockSchema);
