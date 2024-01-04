import mongoose, { Document } from "mongoose";

interface ITransaction extends Document {
  user: mongoose.Schema.Types.ObjectId;
  stock: mongoose.Schema.Types.ObjectId;
  quantity: number;
  transactionPrice: number;
  transactionType: "buy" | "sell";
}

const TransactionSchema = new mongoose.Schema<ITransaction>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    quantity: { type: Number, required: true },
    transactionPrice: { type: Number, required: true },
    transactionType: { type: String, enum: ["buy", "sell"], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
