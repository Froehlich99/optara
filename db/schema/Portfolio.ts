import mongoose, { Document } from "mongoose";

interface IPortfolio extends Document {
  user: mongoose.Schema.Types.ObjectId;
  stock: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const PortfolioSchema = new mongoose.Schema<IPortfolio>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
