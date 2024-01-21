import mongoose, { Document, Schema } from "mongoose";

export interface IPortfolioEntry {
  date: Date;
  value: number;
}

export interface IHolding {
  ISIN: string;
  quantity: number;
  LSID: string;
}

interface IQuest {
  name: string;
  rewardPoints: number;
  completion: number; // Percentage of completion
}

export interface IUser extends Document {
  clerkId: string;
  username: string;
  money: number;
  totalInvestment: number;
  portfolioValue: IPortfolioEntry[];
  gainLoss: number;
  holdings: IHolding[];
  points: number;
  quests: IQuest;
}

const QuestSchema = new mongoose.Schema<IQuest>({
  name: { type: String, required: true },
  rewardPoints: { type: Number, required: true },
  completion: { type: Number, required: true },
});

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
    LSID: { type: String, required: true },
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
    points: { type: Number, default: 0 },
    quests: [QuestSchema],
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
