import mongoose from "mongoose";

interface PortfolioHistory {
  date: Date;
  value: number;
}

export interface IUser extends Document {
  clerkId: string;
  username: string;
  money: number;
  totalInvestment: number;
  portfolioValue: number;
  gainLoss: number;
  portfolioHistory: PortfolioHistory[];
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    money: { type: Number, default: 25000, required: true },
    portfolioValue: { type: Number, default: 0 },
    totalInvestment: { type: Number, default: 0 },
    portfolioHistory: [
      {
        date: { type: Date },
        value: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getGainLoss = function (this: IUser) {
  return this.portfolioValue - this.totalInvestment;
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
