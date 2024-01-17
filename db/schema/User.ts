import mongoose, { Document, Schema } from "mongoose";

export interface IPortfolioEntry {
  date: Date;
  value: number;
}

export interface IHolding {
  ISIN: string;
  quantity: number;
}

export interface IUser extends Document {
  clerkId: string;
  username: string;
  money: number;
  totalInvestment: number;
  portfolioValue: IPortfolioEntry[];
  gainLoss: number;
  holdings: IHolding[];
}

const PortfolioEntrySchema = new Schema<IPortfolioEntry>(
  {
    date: { type: Date, required: true },
    value: { type: Number, required: true },
  },
  { _id: false } // Do not add an `_id` field for subdocuments
);

const HoldingSchema = new Schema<IHolding>(
  {
    ISIN: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    money: { type: Number, default: 25000, required: true },
    portfolioValue: [PortfolioEntrySchema],
    totalInvestment: { type: Number, default: 0 },
    holdings: [HoldingSchema],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getGainLoss = function (this: IUser) {
  // This function will need to be updated to calculate the gain/loss
  // based on the current logic of how you determine the latest portfolio value.
  const latestEntry = this.portfolioValue[this.portfolioValue.length - 1];
  return latestEntry ? latestEntry.value - this.totalInvestment : 0;
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
